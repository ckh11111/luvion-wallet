use crate::vault::tee::EnclaveManager;
use sha2::{Digest, Sha256};

use super::btc_client;

pub struct AtomicSwapSession {
    pub hash_lock: [u8; 32],
    pub secret: [u8; 32],
}

impl AtomicSwapSession {
    /// Start swap session: generate hash lock.
    pub fn new() -> Self {
        let secret = rand::random::<[u8; 32]>();
        let h = Sha256::digest(&secret);
        let mut hash_lock = [0u8; 32];
        hash_lock.copy_from_slice(h.as_slice());
        Self { hash_lock, secret }
    }

    /// Execute withdraw logic.
    pub async fn claim_btc_assets(&self, contract_addr: &str) -> Result<String, String> {
        let secret_hex = EnclaveManager::reveal_secret_for_swap(&self.secret)?;
        let txid = btc_client::send_claim_tx(contract_addr, secret_hex).await?;
        Ok(txid)
    }
}

impl Default for AtomicSwapSession {
    fn default() -> Self {
        Self::new()
    }
}
