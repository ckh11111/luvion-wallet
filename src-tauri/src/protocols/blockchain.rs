/// Placeholder: broadcast signed tx and return tx_hash.
pub async fn broadcast(signed_tx: Vec<u8>) -> Result<String, String> {
    let _ = signed_tx;
    super::chain_client::broadcast(vec![], "default").await
}
