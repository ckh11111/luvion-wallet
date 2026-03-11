use crate::crypto::mpc;
use crate::p2p;
use crate::vault::biometric;

use super::blockchain;

#[tauri::command]
pub async fn cmd_execute_withdraw(
    amount: f64,
    to_addr: String,
    asset: String,
) -> Result<String, String> {
    let _ = p2p::check_shard_consensus().await?;
    biometric::verify_identity_system()
        .map_err(|e| format!("Biometric Failed: {}", e))?;
    let signed_tx = mpc::sign_transaction(amount, to_addr, asset).await?;
    blockchain::broadcast(signed_tx).await
}
