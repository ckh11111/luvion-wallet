/// 占位：广播交易到指定链
pub async fn broadcast(_tx: Vec<u8>, _chain: &str) -> Result<String, String> {
    Ok("0x_broadcast_tx_hash".to_string())
}
