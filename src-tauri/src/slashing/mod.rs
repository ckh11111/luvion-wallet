//! 罚没逻辑：当节点提交无效 ZK 证明时，由网格共识层调用执行罚没
//! 仅持有 ConsensusAuth 的调用方（共识层）有权执行此接口

mod types;
mod registry;
mod traits;

