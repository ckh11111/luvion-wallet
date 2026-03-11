// 从 MPC 根分片产出所有链的地址副本（BIP44 路径）
use crate::crypto::sss::Shard;

/// 按各链 BIP44 路径派生 ETH、SOL 等地址
pub fn derive_all_chains(mpc_root: Shard) {
    let _eth = mpc_root.to_addr("m/44'/60'/0'/0/0");
    let _sol = mpc_root.to_addr("m/44'/501'/0'/0/0");
    // 可扩展 BTC、其他链等
}
