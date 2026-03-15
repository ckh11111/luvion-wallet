//! 视图切换与网络状态：Optimal/Degraded/Recovering/Halted，与 LUVION_V1 门限一致

use crate::core::config::LUVION_V1;
use crate::p2p::NodeID;
use std::time::{SystemTime, UNIX_EPOCH};

// ---------- 第一版：NetworkState + ViewChangeMessage（用于 L-SG 释放判断） ----------

/// 全网共识健康状态（用于 L-SG 是否允许释放）
#[derive(Debug, Clone, PartialEq)]
pub enum NetworkState {
    /// 正常运行，携带当前 Epoch/View ID
    Healthy(u64),
    /// 视图切换中，网络暂停处理普通交易
    ViewChanging(u64),
    /// 在线节点总数低于门限，全网物理熔断
    Suspended,
}

/// 视图切换请求载荷
#[derive(Debug, Clone)]
pub struct ViewChangeMessage {
    pub view_id: u64,
    pub node_id: u32,
    pub signature: Vec<u8>,
}

// ---------- 第二版：NetworkStatus + ViewChangeManager（自愈状态与心跳） ----------

/// 网络运行状态（33 节点 / 22 门限语义）
#[derive(Debug, Clone, PartialEq)]
pub enum NetworkStatus {
    /// 33 节点全部在线
    Optimal,
    /// 22–32 节点在线，性能略有下降
    Degraded,
    /// 正在进行 View Change，携带新视图 ID
    Recovering(u64),
    /// 活跃节点 < 22，全网资产保护性冻结
    Halted,
}

/// 视图切换管理器：当前视图、活跃数、最后心跳、共识状态
pub struct ViewChangeManager {
    pub current_view_id: u64,
    pub active_nodes_count: usize,
    pub last_heartbeat: u64,
    /// 用于 L-SG 释放判断与 monitor_liveness
    pub current_state: NetworkState,
}

impl ViewChangeManager {
    /// 对外暴露：与 get_current_status 一致，供活性锁检查等调用
    pub fn get_status(&self) -> NetworkStatus {
        self.get_current_status()
    }

    /// 判断当前网络是否具备执行签名的能力
    pub fn get_current_status(&self) -> NetworkStatus {
        if self.active_nodes_count < LUVION_V1.signature_threshold {
            return NetworkStatus::Halted;
        }

        let now = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs();
        if now.saturating_sub(self.last_heartbeat) > 5 {
            return NetworkStatus::Recovering(self.current_view_id + 1);
        }

        if self.active_nodes_count < LUVION_V1.committee_size {
            return NetworkStatus::Degraded;
        }

        NetworkStatus::Optimal
    }

    /// 心跳超时监控：超时则置为 ViewChanging 并返回 Err
    pub async fn monitor_liveness(&mut self, _timeout_ms: u64) -> Result<(), String> {
        self.current_state = NetworkState::ViewChanging(self.current_view_id + 1);
        Err("Liveness Check Failed: 触发视图切换".to_string())
    }

    /// 收集 ≥22 张视图切换投票后，从候补池 VRF 重选 33 节点（占位）
    pub async fn execute_view_change(&self, _pool: &[NodeID]) -> Result<Vec<NodeID>, String> {
        println!(
            "警告: 正在启动第 {} 轮视图切换...",
            self.current_view_id + 1
        );
        Ok(vec![])
    }
}
