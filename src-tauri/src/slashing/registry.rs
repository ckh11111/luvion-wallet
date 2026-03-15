//! Slashing execution and stub deps (ProofRegistry, Vault, LVNToken, MeshManager).

use std::collections::HashSet;
use std::sync::{Arc, Mutex};

use super::traits::{LVNTokenLike, MeshManagerLike, ProofRegistryLike, VaultLike};
use super::types::{Address, ConsensusAuth, Signature, SlashingError};

// ---------- Stub impl (replace in production) ----------

/// Malicious record from ZKVerificationEngine failure reports.
pub struct ProofRegistry {
    malicious: Mutex<HashSet<Address>>,
}

impl ProofRegistry {
    pub fn new() -> Self {
        Self {
            malicious: Mutex::new(HashSet::new()),
        }
    }
    pub fn set_malicious(&self, node_id: Address) {
        let _ = self.malicious.lock().unwrap().insert(node_id);
    }
}

impl ProofRegistryLike for ProofRegistry {
    fn get_malicious_record(&self, node_id: Address) -> bool {
        self.malicious.lock().unwrap().contains(&node_id)
    }
}

/// Stake freeze and lock.
pub struct Vault {
    locked: Mutex<HashSet<Address>>,
}

impl Vault {
    pub fn new() -> Self {
        Self {
            locked: Mutex::new(HashSet::new()),
        }
    }
}

impl VaultLike for Vault {
    fn lock_stake(&self, node_id: Address) {
        let _ = self.locked.lock().unwrap().insert(node_id);
    }
    fn is_locked(&self, node_id: Address) -> bool {
        self.locked.lock().unwrap().contains(&node_id)
    }
}

/// Token transfer to ecosystem pool.
pub struct LVNToken;

impl LVNTokenLike for LVNToken {
    fn transfer_to_pool(&self, _node_id: Address, _amount: u128) -> Result<(), String> {
        Ok(())
    }
}

/// Mesh node management.
pub struct MeshManager;

impl MeshManagerLike for MeshManager {
    fn remove_node(&self, _node_id: Address) -> Result<(), String> {
        Ok(())
    }
}

// ---------- Global stub instances (inject in production) ----------

fn get_proof_registry() -> Arc<ProofRegistry> {
    use std::sync::OnceLock;
    static REG: OnceLock<Arc<ProofRegistry>> = OnceLock::new();
    REG.get_or_init(|| Arc::new(ProofRegistry::new())).clone()
}

fn get_vault() -> Arc<Vault> {
    use std::sync::OnceLock;
    static V: OnceLock<Arc<Vault>> = OnceLock::new();
    V.get_or_init(|| Arc::new(Vault::new())).clone()
}

/// Core: on invalid ZK proof from node, consensus layer calls to execute slash.
///
/// # Auth
/// Only consensus layer may call; caller must hold `ConsensusAuth` (created after slash consensus).
///
/// # Errors
/// - If node already frozen: `SlashingError::AlreadyFrozen`.
/// - If node not in malicious record: `SlashingError::NotMalicious`.
pub async fn execute_slashing(
    _auth: ConsensusAuth,
    node_id: Address,
    stake_amount: u128,
) -> Result<(), SlashingError> {
    // 1. Check ZK failure report (from ZKVerificationEngine / ProofRegistry)
    let registry = get_proof_registry();
    let is_malicious = registry.get_malicious_record(node_id);

    if !is_malicious {
        return Err(SlashingError::NotMalicious);
    }

    let vault = get_vault();

    // 2. Check node not already frozen (no double slash)
    if vault.is_locked(node_id) {
        return Err(SlashingError::AlreadyFrozen);
    }

    // 3. Freeze stake
    vault.lock_stake(node_id);

    // 4. Slash: transfer 50% of stake to pool
    let slash_penalty = stake_amount / 2;
    LVNToken
        .transfer_to_pool(node_id, slash_penalty)
        .map_err(SlashingError::TransferFailed)?;

    // 5. Remove node from mesh
    MeshManager
        .remove_node(node_id)
        .map_err(SlashingError::MeshRemoveFailed)?;

    Ok(())
}

/// Consensus-gated slash: only after BFT quorum (2/3+1) and all vote signatures verified.
pub async fn execute_slashing_with_consensus(
    node_id: Address,
    votes: Vec<Signature>,
    total_active_nodes: usize,
    stake_amount: u128,
) -> Result<(), SlashingError> {
    let required_quorum = (total_active_nodes * 2 / 3) + 1;
    if votes.len() < required_quorum {
        return Err(SlashingError::InsufficientQuorum);
    }
    for sig in &votes {
        sig.verify_or_fail()?;
    }
    let auth = ConsensusAuth::from_consensus_layer();
    execute_slashing(auth, node_id, stake_amount).await
}
