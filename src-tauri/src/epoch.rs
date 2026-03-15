//! Epoch and node status: Active/Standby/Slashed; VRF rotates committee.

use crate::p2p::NodeID;

/// Node status.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum NodeStatus {
    /// Current committee member (size per LUVION_V1.committee_size).
    Active,
    /// Standby.
    Standby,
    /// Slashed.
    Slashed,
}

/// Staker (for VRF selection).
#[derive(Clone)]
pub struct Staker {
    pub node_id: NodeID,
    pub stake: u128,
}

/// Epoch manager: current epoch and active set.
pub struct EpochManager {
    pub current_epoch: u64,
    pub active_set: Vec<NodeID>,
}

impl EpochManager {
    /// At epoch end, VRF reselect nodes (committee size per LUVION_V1).
    pub fn rotate_nodes(_pool: Vec<Staker>) -> Vec<NodeID> {
        unimplemented!("VRF-based node selection logic")
    }
}
