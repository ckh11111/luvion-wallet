//! View change and network state: Optimal/Degraded/Recovering/Halted, aligned with LUVION_V1 threshold.

use crate::core::config::LUVION_V1;
use crate::p2p::NodeID;
use std::time::{SystemTime, UNIX_EPOCH};

// ---------- v1: NetworkState + ViewChangeMessage (for L-SG release decision) ----------

/// Global consensus health (used to decide whether L-SG allows release).
#[derive(Debug, Clone, PartialEq)]
pub enum NetworkState {
    /// Normal; carries current Epoch/View ID.
    Healthy(u64),
    /// View change in progress; network pauses normal tx.
    ViewChanging(u64),
    /// Total online nodes below threshold; network halted.
    Suspended,
}

/// View-change request payload.
#[derive(Debug, Clone)]
pub struct ViewChangeMessage {
    pub view_id: u64,
    pub node_id: u32,
    pub signature: Vec<u8>,
}

// ---------- v2: NetworkStatus + ViewChangeManager (recovery + heartbeat) ----------

/// Network status (33 nodes / 22 threshold semantics).
#[derive(Debug, Clone, PartialEq)]
pub enum NetworkStatus {
    /// All 33 nodes online.
    Optimal,
    /// 22–32 nodes online; slightly degraded.
    Degraded,
    /// View change in progress; new view ID.
    Recovering(u64),
    /// Active nodes < 22; assets frozen.
    Halted,
}

/// View-change manager: current view, active count, last heartbeat, state.
pub struct ViewChangeManager {
    pub current_view_id: u64,
    pub active_nodes_count: usize,
    pub last_heartbeat: u64,
    /// Used for L-SG release decision and monitor_liveness.
    pub current_state: NetworkState,
}

impl ViewChangeManager {
    /// Public alias for get_current_status (e.g. liveness lock).
    pub fn get_status(&self) -> NetworkStatus {
        self.get_current_status()
    }

    /// Whether the network can execute signing.
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

    /// Heartbeat timeout: on timeout set ViewChanging and return Err
    pub async fn monitor_liveness(&mut self, _timeout_ms: u64) -> Result<(), String> {
        self.current_state = NetworkState::ViewChanging(self.current_view_id + 1);
        Err("Liveness check failed: triggering view change".to_string())
    }

    /// After ≥22 view-change votes, VRF reselect 33 nodes from pool (placeholder)
    pub async fn execute_view_change(&self, _pool: &[NodeID]) -> Result<Vec<NodeID>, String> {
        println!(
            "Warning: starting view change round {}...",
            self.current_view_id + 1
        );
        Ok(vec![])
    }
}
