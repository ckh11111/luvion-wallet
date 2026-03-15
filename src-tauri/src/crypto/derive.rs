// Derive addresses for all chains from MPC root shard (BIP44).
use crate::crypto::sss::Shard;

/// Derive ETH, SOL etc. by BIP44 path per chain.
pub fn derive_all_chains(mpc_root: Shard) {
    let _eth = mpc_root.to_addr("m/44'/60'/0'/0/0");
    let _sol = mpc_root.to_addr("m/44'/501'/0'/0/0");
    // Extend to BTC, other chains
}
