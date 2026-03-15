//! MPC: Groth16 shard-claim verification + signing-share validation middleware.
pub mod core;
pub mod signing;
pub mod zk_proof_system;

pub use core::{run_zk_verification_middleware, ShardClaim};
pub use signing::{aggregate_signature, FinalSignature, NodeHandle, SigningError};
pub use zk_proof_system::ZKVerificationEngine;
