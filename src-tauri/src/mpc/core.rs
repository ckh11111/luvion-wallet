//! MPC core: Groth16 verification as middleware in prepare_signing_shards share validation.
use super::zk_proof_system::{Fr, ZKVerificationEngine};
use ark_bn254::Bn254;
use ark_groth16::Proof;

/// Single shard claim: node's proof + public inputs.
pub struct ShardClaim {
    pub proof: Proof<Bn254>,
    pub public_inputs: Vec<Fr>,
}

/// Middleware verification failure (includes node index).
#[derive(Debug)]
pub struct ZKMiddlewareError(pub String);

impl std::fmt::Display for ZKMiddlewareError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        self.0.fmt(f)
    }
}

impl std::error::Error for ZKMiddlewareError {}

/// On verification failure report malicious node (can trigger heartbeat/resharing).
pub fn report_malicious_node(node_id: u8) {
    // Placeholder: report to P2P reputation/heartbeat; trigger resharing
    let _ = node_id;
}

/// ZK verification middleware: in prepare_signing_shards, verify each shard claim with Groth16; on failure call report_malicious_node and return error.
pub fn run_zk_verification_middleware(
    engine: &ZKVerificationEngine,
    claims: &[ShardClaim],
) -> Result<(), ZKMiddlewareError> {
    for (i, claim) in claims.iter().enumerate() {
        if !engine.verify_shard_claim(&claim.proof, &claim.public_inputs) {
            let node_id = i as u8;
            report_malicious_node(node_id);
            return Err(ZKMiddlewareError(format!(
                "ZK shard claim verification failed for node {}",
                node_id
            )));
        }
    }
    Ok(())
}
