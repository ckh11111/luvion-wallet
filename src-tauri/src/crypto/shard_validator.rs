use super::merkle;

/// Use Merkle tree to ensure shards are untampered.
pub struct ShardValidator {
    pub root_hash: [u8; 32],
}

impl ShardValidator {
    /// Verify the i-th shard recovered from P2P.
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
