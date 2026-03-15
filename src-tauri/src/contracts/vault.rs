//! L-SG 金库合约逻辑：撤销窗口内根据网络共识状态决定是否允许释放

use crate::consensus::{NetworkState, NetworkStatus, ViewChangeManager};
use crate::core::config::REVOCATION_WINDOW_HOURS;

/// 活性锁检查：非 Optimal 时禁止资产释放，返回错误
pub fn ensure_release_allowed(network_manager: &ViewChangeManager) -> Result<(), String> {
    if network_manager.get_status() != NetworkStatus::Optimal {
        return Err(
            "网络共识不稳定，L-SG 撤销窗口已自动挂起，资产暂时冻结以保护安全。".to_string(),
        );
    }
    Ok(())
}

/// L-SG 金库：交易时间戳与当前时间，用于撤销窗口校验
pub struct LuvionVault {
    /// 交易发起时间（秒级时间戳）
    pub tx_timestamp: u64,
    /// 当前链/系统时间（秒级时间戳）
    pub current_time: u64,
}

impl LuvionVault {
    /// 检查资产是否已过撤销保护期，可以正式释放给目标地址。
    /// 若网络处于 ViewChanging 或 Suspended，一律拒绝释放。
    pub fn is_safe_to_release(&self, network_state: &NetworkState) -> bool {
        if matches!(
            network_state,
            NetworkState::ViewChanging(_) | NetworkState::Suspended
        ) {
            eprintln!(
                "安全拦截: 网络共识不稳定，L-SG 撤销窗口自动冻结挂起！"
            );
            return false;
        }

        self.current_time >= self.tx_timestamp + REVOCATION_WINDOW_HOURS * 3600
    }
}
