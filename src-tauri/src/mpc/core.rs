//! MPC 核心：将 Groth16 验证作为中间件插入 prepare_signing_shards 的签名份额校验流程
use super::zk_proof_system::{Fr, ZKVerificationEngine};
use ark_bn254::Bn254;
use ark_groth16::Proof;

/// 单条分片声明：节点提交的 proof + 公开输入
pub struct ShardClaim {
    pub proof: Proof<Bn254>,
    pub public_inputs: Vec<Fr>,
}

/// 中间件校验失败错误（含失败节点索引）
#[derive(Debug)]
pub struct ZKMiddlewareError(pub String);

impl std::fmt::Display for ZKMiddlewareError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        self.0.fmt(f)
    }
}

impl std::error::Error for ZKMiddlewareError {}

/// 校验失败时上报恶意节点（可对接心跳/重组协议）
pub fn report_malicious_node(node_id: u8) {
    // 占位：实际上报到 P2P 声誉/心跳模块，触发 resharing 等
    let _ = node_id;
}

/// ZK 验证中间件：在 prepare_signing_shards 流程中，先对每条分片声明做 Groth16 校验；
/// 若某条校验失败则调用 report_malicious_node 并返回错误。
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
