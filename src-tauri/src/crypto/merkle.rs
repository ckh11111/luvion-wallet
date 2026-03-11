use sha2::{Digest, Sha256};

pub struct MerkleValidator {
    pub root_hash: [u8; 32],
}

impl MerkleValidator {
    /// 核心拦截函数：比对碎片指纹与默克尔路径
    pub fn validate_and_intercept(
        &self,
        shard_index: u8,
        data: &[u8],
        proof: Vec<[u8; 32]>,
    ) -> bool {
        let mut hash = Sha256::digest(data);
        for p in proof {
            let mut combined = Vec::new();
            if shard_index % 2 == 0 {
                combined.extend_from_slice(&hash);
                combined.extend_from_slice(&p);
            } else {
                combined.extend_from_slice(&p);
                combined.extend_from_slice(&hash);
            }
            hash = Sha256::digest(&combined);
        }
        hash.as_slice() == &self.root_hash[..]
    }
}

/// 供 ShardValidator 等使用的路径验证
pub fn verify_path(
    root_hash: [u8; 32],
    shard_index: u8,
    shard_data: &[u8],
    proof: Vec<[u8; 32]>,
) -> bool {
    let v = MerkleValidator { root_hash };
    v.validate_and_intercept(shard_index, shard_data, proof)
}

/// 分片数据哈希（供 verify_incoming_shard 等使用）
pub fn hash_shard(data: &[u8]) -> [u8; 32] {
    let h = Sha256::digest(data);
    let mut out = [0u8; 32];
    out.copy_from_slice(h.as_slice());
    out
}

/// 从叶子与路径向上推导根哈希
pub fn compute_merkle_root(
    leaf: [u8; 32],
    index: usize,
    proof: Vec<[u8; 32]>,
) -> [u8; 32] {
    merkle_compute_root(leaf, index, proof)
}

/// 对外统一入口：验证根与 proof 一致
pub fn verify(
    root: [u8; 32],
    index: usize,
    data: &[u8],
    proof: Vec<[u8; 32]>,
) -> bool {
    verify_incoming_shard(root, index, data, proof)
}

/// 验证入站分片：根与 proof 推导一致则通过，否则拦截并打日志
pub fn verify_incoming_shard(
    root: [u8; 32],
    index: usize,
    data: &[u8],
    proof: Vec<[u8; 32]>,
) -> bool {
    let leaf = hash_shard(data);
    let computed_root = compute_merkle_root(leaf, index, proof);
    if computed_root != root {
        println!("[SECURITY] Intercepted malicious shard from Node {}", index);
        return false;
    }
    true
}

/// 从叶子与路径向上推导根哈希（供 LuvionValidator 等使用）
pub fn merkle_compute_root(
    leaf: [u8; 32],
    _shard_index: usize,
    proof: Vec<[u8; 32]>,
) -> [u8; 32] {
    let mut hash = leaf;
    for (i, p) in proof.iter().enumerate() {
        let mut combined = Vec::new();
        if i % 2 == 0 {
            combined.extend_from_slice(&hash);
            combined.extend_from_slice(p);
        } else {
            combined.extend_from_slice(p);
            combined.extend_from_slice(&hash);
        }
        let h = Sha256::digest(&combined);
        hash.copy_from_slice(h.as_slice());
    }
    hash
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn stress_test_malicious_nodes() {
        let original_hash = Sha256::digest(b"ORIGINAL_DATA");
        let mut root_hash = [0u8; 32];
        root_hash.copy_from_slice(original_hash.as_slice());

        let validator = MerkleValidator { root_hash };
        let mut total_intercepted = 0;

        for i in 1..=18 {
            let is_malicious = i > 10;
            let shard_data = if is_malicious {
                b"TAMPERED_DATA"
            } else {
                b"ORIGINAL_DATA"
            };
            if !validator.validate_and_intercept(i, shard_data, vec![]) {
                total_intercepted += 1;
            }
        }

        assert_eq!(total_intercepted, 8);
    }
}
