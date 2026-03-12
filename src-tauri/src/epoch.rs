//! Epoch 与节点状态：Active/Standby/Slashed，VRF 轮换当值节点

use crate::p2p::NodeID;

/// 节点状态
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum NodeStatus {
    /// 当前当值的 18 个节点
    Active,
    /// 候补节点
    Standby,
    /// 被罚没节点
    Slashed,
}

/// 质押者（用于 VRF 抽选）
#[derive(Clone)]
pub struct Staker {
    pub node_id: NodeID,
    pub stake: u128,
}

/// Epoch 管理器：当前 epoch 与当值节点集合
pub struct EpochManager {
    pub current_epoch: u64,
    pub active_set: Vec<NodeID>,
}

impl EpochManager {
    /// 每个 Epoch 结束时，基于 VRF 重新选择节点
    /// 使用 VRF 随机选出 18 个节点，确保过程透明且不可预测
    pub fn rotate_nodes(_pool: Vec<Staker>) -> Vec<NodeID> {
        unimplemented!("VRF-based node selection logic")
    }
}
