use crate::vault::tee::EnclaveManager;
use tokio::time::{sleep, Duration};

pub async fn start_recovery_monitor() {
    loop {
        let active_nodes = super::get_active_peer_count().await;

        if active_nodes < 11 {
            println!(
                "CRITICAL: Node count dropped to {}. Initiating Resharding...",
                active_nodes
            );

            match EnclaveManager::reconstruct_and_reshard().await {
                Ok(_) => println!("SELF_HEALING_COMPLETE: 18 new shards redistributed."),
                Err(e) => eprintln!("SELF_HEALING_FAILED: {}", e),
            }
        }

        sleep(Duration::from_secs(10)).await;
    }
}
