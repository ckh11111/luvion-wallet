/// 占位：在 HTLC 合约上执行 claim，返回交易哈希
pub async fn claim_htlc(
    _swap_id: String,
    _preimage: String,
    _sk: Vec<u8>,
) -> Result<String, String> {
    Ok("0x_htlc_claim_tx_hash".to_string())
}
