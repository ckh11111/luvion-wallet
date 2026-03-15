//! Slashing traits (stub impl in registry; replace in production).

use crate::slashing::types::Address;

/// Malicious record from invalid ZK proof reports.
pub trait ProofRegistryLike {
    fn get_malicious_record(&self, node_id: Address) -> bool;
}

/// Stake freeze and lock state.
pub trait VaultLike {
    fn lock_stake(&self, node_id: Address);
    fn is_locked(&self, node_id: Address) -> bool;
}

/// Transfer token to ecosystem pool.
pub trait LVNTokenLike {
    fn transfer_to_pool(&self, node_id: Address, amount: u128) -> Result<(), String>;
}

/// Remove node from mesh.
pub trait MeshManagerLike {
    fn remove_node(&self, node_id: Address) -> Result<(), String>;
}
