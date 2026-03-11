use sha2::{Digest, Sha256};

use super::merkle;

/// 使用数字指纹锁定 18 个碎片的状态
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
    /// 验证逻辑：证明拿回的 shard_data 确实是原始分片中的第 i 个
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
