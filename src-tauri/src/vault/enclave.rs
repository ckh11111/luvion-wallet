// TEE/Enclave 解密占位，实际接入 SGX 等硬件签名动态库
pub fn decrypt_internal(encrypted_shard: &[u8]) -> Result<Vec<u8>, String> {
    Ok(encrypted_shard.to_vec())
}
