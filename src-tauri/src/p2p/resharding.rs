use crate::crypto::sss::ShardEngine;
use crate::vault::manager::get_biometric_token;
use crate::vault::tee::EnclaveManager;

pub async fn trigger_resharding(current_shards: Vec<Vec<u8>>) -> Result<(), String> {
    println!("Resharding Protocol Triggered: Node loss detected.");

    let encrypted = current_shards
        .first()
        .cloned()
        .unwrap_or_default();
    let sk = EnclaveManager::secure_shard_access(get_biometric_token(), encrypted)?;

    let new_shards = ShardEngine::split_private_key(sk);

    for (i, shard) in new_shards.iter().enumerate() {
        super::broadcast_shard_update(i as u8, shard).await?;
    }

    Ok(())
}
