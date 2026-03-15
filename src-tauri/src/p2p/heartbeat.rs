// Heartbeat: every 5s scan committee; if offline trigger shard resharing (size per LUVION_V1).
use crate::core::config::LUVION_V1;
use std::time::Duration;
use tokio::time;

/// Node status (for heartbeat scan).
pub struct HeartbeatNode {
    pub id: u8,
    pub offline: bool,
}

impl HeartbeatNode {
    pub fn is_offline(&self) -> bool {
        self.offline
    }
}

/// Placeholder: scan committee-sized node responses.
pub async fn scan_node_mesh() -> Vec<HeartbeatNode> {
    let n = LUVION_V1.committee_size;
    (1..=n)
        .map(|i| HeartbeatNode {
            id: i as u8,
            offline: i > n - 5, // Simulate some nodes offline
        })
        .collect()
}

/// Placeholder: trigger shard resharing.
pub async fn trigger_shard_resharing(_node_id: u8) {}

/// Every 5s scan nodes; if offline trigger proactive resharing.
pub async fn start_heartbeat_monitor() {
    let mut interval = time::interval(Duration::from_secs(5));
    loop {
        interval.tick().await;
        let nodes = scan_node_mesh().await;
        for node in nodes {
            if node.is_offline() {
                trigger_shard_resharing(node.id).await;
            }
        }
    }
}
