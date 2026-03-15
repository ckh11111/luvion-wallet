use sha2::{Digest, Sha256};

pub struct MerkleValidator {
    pub root_hash: [u8; 32],
}

impl MerkleValidator {
    /// Core check: compare shard fingerprint with Merkle path.
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

/// Path verification for ShardValidator etc.
pub fn verify_path(
    root_hash: [u8; 32],
    shard_index: u8,
    shard_data: &[u8],
    proof: Vec<[u8; 32]>,
) -> bool {
    let v = MerkleValidator { root_hash };
    v.validate_and_intercept(shard_index, shard_data, proof)
}

/// Hash shard data (for verify_incoming_shard etc.).
pub fn hash_shard(data: &[u8]) -> [u8; 32] {
    let h = Sha256::digest(data);
    let mut out = [0u8; 32];
    out.copy_from_slice(h.as_slice());
    out
}

/// Compute root from leaf and path.
pub fn compute_merkle_root(
    leaf: [u8; 32],
    index: usize,
    proof: Vec<[u8; 32]>,
) -> [u8; 32] {
    merkle_compute_root(leaf, index, proof)
}

/// Single entry: verify root matches proof.
pub fn verify(
    root: [u8; 32],
    index: usize,
    data: &[u8],
    proof: Vec<[u8; 32]>,
) -> bool {
    verify_incoming_shard(root, index, data, proof)
}

/// Verify incoming shard: pass if root matches proof; else intercept and log.
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

/// Compute root from leaf and path (for LuvionValidator etc.).
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
    use crate::core::config::LUVION_V1;
    use super::*;

    #[tokio::test]
    async fn stress_test_malicious_nodes() {
        let original_hash = Sha256::digest(b"ORIGINAL_DATA");
        let mut root_hash = [0u8; 32];
        root_hash.copy_from_slice(original_hash.as_slice());

        let validator = MerkleValidator { root_hash };
        let mut total_intercepted = 0;
        let n = LUVION_V1.committee_size;
        let threshold = LUVION_V1.signature_threshold;

        for i in 1..=n {
            let is_malicious = i > threshold;
            let shard_data = if is_malicious {
                b"TAMPERED_DATA"
            } else {
                b"ORIGINAL_DATA"
            };
            if !validator.validate_and_intercept(i as u8, shard_data, vec![]) {
                total_intercepted += 1;
            }
        }

        assert_eq!(total_intercepted, n - threshold);
    }
}
