//! MPC 模块：Groth16 分片声明验证 + 签名份额校验中间件
pub mod core;
pub mod zk_proof_system;

pub use core::{
    run_zk_verification_middleware, ShardClaim,
};
pub use zk_proof_system::ZKVerificationEngine;
