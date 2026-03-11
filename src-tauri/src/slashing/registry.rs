//! 罚没执行逻辑与依赖的 Stub 实现（ProofRegistry, Vault, LVNToken, MeshManager）

use std::collections::HashSet;
use std::sync::{Arc, Mutex};

use super::traits::{LVNTokenLike, MeshManagerLike, ProofRegistryLike, VaultLike};
use super::types::{Address, ConsensusAuth, SlashingError};

// ---------- Stub 实现（生产环境可替换为真实实现） ----------

/// 恶意记录：来自 ZKVerificationEngine 的失败报告
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

/// 质押冻结与锁定
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

/// 代币转入生态补偿池
pub struct LVNToken;

impl LVNTokenLike for LVNToken {
    fn transfer_to_pool(&self, _node_id: Address, _amount: u128) -> Result<(), String> {
        Ok(())
    }
}

/// 网格节点管理
pub struct MeshManager;

impl MeshManagerLike for MeshManager {
    fn remove_node(&self, _node_id: Address) -> Result<(), String> {
        Ok(())
    }
}

// ---------- 全局 Stub 实例（生产可改为注入） ----------

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

/// 核心逻辑：若检测到节点提交无效 ZK 证明，由共识层调用并强制执行罚没。
///
/// # 鉴权
/// 仅网格共识层有权调用：调用方必须持有 `ConsensusAuth`（由共识层在达成罚没共识后创建）。
///
/// # 错误处理
/// - 若节点已处于冻结期，返回 `SlashingError::AlreadyFrozen`，避免重复罚没。
/// - 若节点未在恶意记录中，返回 `SlashingError::NotMalicious`。
pub async fn execute_slashing(
    _auth: ConsensusAuth,
    node_id: Address,
    stake_amount: u128,
) -> Result<(), SlashingError> {
    // 1. 校验 ZK 证据的失败报告（来自 ZKVerificationEngine / ProofRegistry）
    let registry = get_proof_registry();
    let is_malicious = registry.get_malicious_record(node_id);

    if !is_malicious {
        return Err(SlashingError::NotMalicious);
    }

    let vault = get_vault();

    // 2. 检查节点是否已在冻结期，避免重复罚没
    if vault.is_locked(node_id) {
        return Err(SlashingError::AlreadyFrozen);
    }

    // 3. 冻结质押
    vault.lock_stake(node_id);

    // 4. 执行罚没：将质押的 50% 转入生态补偿池
    let slash_penalty = stake_amount / 2;
    LVNToken
        .transfer_to_pool(node_id, slash_penalty)
        .map_err(SlashingError::TransferFailed)?;

    // 5. 从网格中剔除节点
    MeshManager
        .remove_node(node_id)
        .map_err(SlashingError::MeshRemoveFailed)?;

    Ok(())
}
