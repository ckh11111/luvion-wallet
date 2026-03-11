use super::merkle;

/// 使用 Merkle Tree 确保碎片未被篡改
pub struct ShardValidator {
    pub root_hash: [u8; 32],
}

impl ShardValidator {
    /// 验证从 P2P 网络拿回的第 i 个碎片
    pub fn verify_shard(
        &self,
        shard_index: u8,
        shard_data: &[u8],
        proof: Vec<[u8; 32]>,
    ) -> bool {
        merkle::verify_path(
            self.root_hash,
            shard_index,
            shard_data,
            proof,
        )
    }
}
