use crate::core::config::LUVION_V1;
use crate::vault::tee::EnclaveManager;
use tokio::time::{sleep, Duration};

pub async fn start_recovery_monitor() {
    let threshold = LUVION_V1.signature_threshold as u32;
    let committee = LUVION_V1.committee_size;

    loop {
        let active_nodes = super::get_active_peer_count().await;

        if active_nodes < threshold {
            println!(
                "CRITICAL: Node count dropped to {}. Initiating Resharding...",
                active_nodes
            );

            match EnclaveManager::reconstruct_and_reshard().await {
                Ok(_) => println!("SELF_HEALING_COMPLETE: {} new shards redistributed.", committee),
                Err(e) => eprintln!("SELF_HEALING_FAILED: {}", e),
            }
        }

        sleep(Duration::from_secs(10)).await;
    }
}
