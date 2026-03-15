use sha2::{Digest, Sha256};

use super::merkle;

/// Lock state of shards via fingerprint.
pub struct LuvionValidator {
    pub root: [u8; 32],
}

fn hash(data: &[u8]) -> [u8; 32] {
    let h = Sha256::digest(data);
    let mut out = [0u8; 32];
    out.copy_from_slice(h.as_slice());
    out
}

impl LuvionValidator {
    /// Verify that shard_data is the i-th original shard.
    pub fn verify(
        &self,
        shard_index: usize,
        shard_data: &[u8],
        proof: Vec<[u8; 32]>,
    ) -> bool {
        let leaf = hash(shard_data);
        let computed_root = merkle::merkle_compute_root(leaf, shard_index, proof);
        computed_root == self.root
    }
}
