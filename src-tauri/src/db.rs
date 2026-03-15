// Use SQLCipher for full-disk encryption at DB layer.
use argon2::Argon2;
use rusqlite::Connection;

const SALT: &[u8] = b"luvion-vault-salt-v1";

/// Derive 256-bit key from user PIN via Argon2; init encrypted DB.
pub fn init_secure_db(user_pin: &str) -> Result<(), String> {
    let mut key = [0u8; 32];
    Argon2::default()
        .hash_password_into(user_pin.as_bytes(), SALT, &mut key)
        .map_err(|e| e.to_string())?;

    let connection =
        Connection::open("luvion_vault.db").map_err(|e| e.to_string())?;

    // SQLCipher: set encryption with derived key
    let key_hex = hex::encode(key);
    connection
        .pragma_update(None, "key", format!("x'{}'", key_hex))
        .map_err(|e| e.to_string())?;

    connection
        .execute(
            "CREATE TABLE IF NOT EXISTS shards (id INTEGER PRIMARY KEY, content BLOB)",
            [],
        )
        .map_err(|e| e.to_string())?;

    Ok(())
}
