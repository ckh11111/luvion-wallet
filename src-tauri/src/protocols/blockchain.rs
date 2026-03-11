/// 占位：广播已签名交易并返回 tx_hash
pub async fn broadcast(signed_tx: Vec<u8>) -> Result<String, String> {
    let _ = signed_tx;
    super::chain_client::broadcast(vec![], "default").await
}
