use aes_gcm::{
    aead::{Aead, KeyInit},
    Aes256Gcm, Key, Nonce,
};

fn key_32(master_key: &[u8]) -> [u8; 32] {
    let mut k = [0u8; 32];
    let len = master_key.len().min(32);
    k[..len].copy_from_slice(&master_key[..len]);
    k
}

pub fn encrypt_config(data: &[u8], master_key: &[u8]) -> Vec<u8> {
    let k = key_32(master_key);
    let key = Key::<Aes256Gcm>::from_slice(&k);
    let cipher = Aes256Gcm::new(key);
    let nonce = Nonce::from_slice(b"unique_nonce0"); // 12 bytes for GCM
    cipher.encrypt(nonce, data).expect("Encryption failed")
}

pub fn decrypt_config(encrypted_data: &[u8], master_key: &[u8]) -> Vec<u8> {
    let k = key_32(master_key);
    let key = Key::<Aes256Gcm>::from_slice(&k);
    let cipher = Aes256Gcm::new(key);
    let nonce = Nonce::from_slice(b"unique_nonce0");
    cipher.decrypt(nonce, encrypted_data).expect("Decryption failed")
}
