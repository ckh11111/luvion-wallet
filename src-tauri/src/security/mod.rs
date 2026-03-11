pub use crate::vault::biometric::biometric_verify;

pub trait QuantumSafeVault {
    fn generate_keypair() -> (Vec<u8>, Vec<u8>);
    fn sign_message(msg: &[u8], sk: &[u8]) -> Vec<u8>;
}

pub struct LuvionCore;

impl LuvionCore {
    pub fn create_shards(_secret: Vec<u8>, _threshold: usize, _total: usize) -> Vec<Vec<u8>> {
        vec![]
    }
}
