use crate::vault::tee::EnclaveManager;
use crate::vault::manager::{get_biometric_token, get_vault_secret};
use super::eth;

#[tauri::command]
pub async fn cmd_atomic_swap(swap_id: String, preimage: String) -> Result<String, String> {
    let sk = EnclaveManager::secure_shard_access(get_biometric_token(), get_vault_secret())?;
    let tx_hash = eth::claim_htlc(swap_id, preimage, sk).await?;
    Ok(format!("SWAP_SUCCESS: {}", tx_hash))
}
