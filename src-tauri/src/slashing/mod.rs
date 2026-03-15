//! Slashing: when node submits invalid ZK proof, consensus layer calls to execute. Only callers with ConsensusAuth may call.

mod types;
mod registry;
mod traits;

