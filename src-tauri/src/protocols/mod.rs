use async_trait::async_trait;

pub mod atomic_swap;
pub mod blockchain;
pub mod btc_client;
pub mod chain_client;
pub mod commands;
pub mod eth;
pub mod simulate;
pub mod swap;
pub mod withdraw;

#[async_trait]
pub trait ChainProtocol {
    fn derive_address(&self, public_key: &[u8]) -> String;
    async fn get_balance(&self, address: &str) -> Result<f64, String>;
    async fn build_tx(&self, to: &str, amount: f64) -> Result<Vec<u8>, String>;
}

pub struct EthereumAdapter;

#[async_trait]
impl ChainProtocol for EthereumAdapter {
    fn derive_address(&self, pk: &[u8]) -> String {
        let slice = pk.get(0..20).unwrap_or(pk);
        format!("0x{}", hex::encode(slice))
    }
    async fn get_balance(&self, _addr: &str) -> Result<f64, String> {
        Ok(1.25)
    }
    async fn build_tx(&self, _to: &str, _amt: f64) -> Result<Vec<u8>, String> {
        Ok(vec![0, 1, 2, 3])
    }
}
