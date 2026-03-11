//! MPC 模块：Groth16 分片声明验证 + 签名份额校验中间件
pub mod core;
pub mod zk_proof_system;

pub use core::{
    report_malicious_node, run_zk_verification_middleware, ShardClaim, ZKMiddlewareError,
};
pub use zk_proof_system::ZKVerificationEngine;
pub use zk_proof_system::Fr;
