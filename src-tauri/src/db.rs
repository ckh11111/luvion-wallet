// 使用 SQLCipher 实现数据库层面的全盘加密
use argon2::Argon2;
use rusqlite::Connection;

const SALT: &[u8] = b"luvion-vault-salt-v1";

/// 使用用户 PIN 经 Argon2 派生 256 位密钥，初始化加密数据库
pub fn init_secure_db(user_pin: &str) -> Result<(), String> {
    let mut key = [0u8; 32];
    Argon2::default()
        .hash_password_into(user_pin.as_bytes(), SALT, &mut key)
        .map_err(|e| e.to_string())?;

    let connection =
        Connection::open("luvion_vault.db").map_err(|e| e.to_string())?;

    // SQLCipher: 使用派生密钥设置加密
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
