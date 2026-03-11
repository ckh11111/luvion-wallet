//! 罚没依赖的 Trait 定义（由 registry 中的 stub 实现，生产可替换为真实实现）

use crate::slashing::types::Address;

/// 无效 ZK 证明的恶意记录查询
pub trait ProofRegistryLike {
    fn get_malicious_record(&self, node_id: Address) -> bool;
}

/// 质押冻结与锁定状态
pub trait VaultLike {
    fn lock_stake(&self, node_id: Address);
    fn is_locked(&self, node_id: Address) -> bool;
}

/// 代币转入生态补偿池
pub trait LVNTokenLike {
    fn transfer_to_pool(&self, node_id: Address, amount: u128) -> Result<(), String>;
}

/// 从网格中移除节点
pub trait MeshManagerLike {
    fn remove_node(&self, node_id: Address) -> Result<(), String>;
}
