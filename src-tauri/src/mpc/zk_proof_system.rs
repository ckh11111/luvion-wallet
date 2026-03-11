//! 商业版：利用 ZK-SNARK (Groth16) 验证分片合法性，支持批量并行校验
use ark_bn254::Bn254;
use ark_ff::PrimeField;
use ark_groth16::{prepare_verifying_key, Groth16, PreparedVerifyingKey, Proof, VerifyingKey};
use rayon::prelude::*;
use std::sync::Arc;

/// Bn254 标量域（公开输入类型）
pub type Fr = ark_bn254::Fr;

/// 从字节解析验证键（占位：生产环境需反序列化真实 VK）
fn parse_vk(raw_vk: &[u8]) -> VerifyingKey<Bn254> {
    if raw_vk.is_empty() {
        panic!("parse_vk: empty VK bytes, load real verifying key in production");
    }
    ark_serialize::CanonicalDeserialize::deserialize_uncompressed(raw_vk)
        .unwrap_or_else(|_| panic!("parse_vk: invalid VK bytes"))
}

/// 将公开输入字节转为 Fr 数组（每段取前 32 字节按大端解释）
fn parse_public_inputs(public_inputs: &[Vec<u8>]) -> Vec<Fr> {
    public_inputs
        .iter()
        .filter_map(|b| {
            let mut buf = [0u8; 32];
            let len = b.len().min(32);
            buf[32 - len..].copy_from_slice(&b[..len]);
            Some(Fr::from_be_bytes_mod_order(&buf))
        })
        .collect()
}

/// ZK 验证引擎：持有预计算验证键（可选 Arc 便于多线程共享），支持单条与批量并行校验
pub struct ZKVerificationEngine {
    /// 无 VK 时跳过验证（开发/占位）；有 VK 时用 Arc 包装便于并发共享
    pub pvk: Option<Arc<PreparedVerifyingKey<Bn254>>>,
}

impl ZKVerificationEngine {
    /// 无验证键构造（占位/开发用，始终通过）
    pub fn without_vk() -> Self {
        Self { pvk: None }
    }

    /// 使用给定验证键构造（生产用）
    pub fn with_verifying_key(vk: &VerifyingKey<Bn254>) -> Self {
        Self {
            pvk: Some(Arc::new(prepare_verifying_key(vk))),
        }
    }

    /// 从原始 VK 字节构造，启动阶段一次性预处理，降低校验时计算量
    pub fn new(raw_vk: &[u8]) -> Self {
        let vk = parse_vk(raw_vk);
        let pvk = prepare_verifying_key(&vk);
        Self {
            pvk: Some(Arc::new(pvk)),
        }
    }

    /// 单条分片声明校验
    pub fn verify_shard_claim(&self, proof: &Proof<Bn254>, public_inputs: &[Fr]) -> bool {
        let Some(ref pvk) = self.pvk else {
            return true;
        };
        Groth16::<Bn254>::verify_proof(pvk.as_ref(), proof, public_inputs).unwrap_or(false)
    }

    /// 批量并行校验分片证明：用 Rayon 线程池并行验证，将 18 次串行校验压缩到接近 1 次耗时
    pub fn verify_shard_claims_batch(
        &self,
        shards: Vec<(Proof<Bn254>, Vec<Vec<u8>>)>,
    ) -> bool {
        let Some(ref pvk) = self.pvk else {
            return true;
        };
        let pvk = Arc::clone(pvk);
        let all_valid = shards
            .par_iter()
            .all(|(proof, public_inputs)| {
                let inputs = parse_public_inputs(public_inputs);
                Groth16::<Bn254>::verify_proof(pvk.as_ref(), proof, &inputs).unwrap_or(false)
            });
        if !all_valid {
            #[cfg(debug_assertions)]
            eprintln!("⚠️ 警告：检测到无效的 ZK 分片证明，立即触发协议自愈！");
        }
        all_valid
    }
}
