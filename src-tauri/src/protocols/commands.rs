#[tauri::command]
pub async fn cmd_sign_tx(_amount: f64, to: String) -> Result<String, String> {
    Ok(format!("0x_sig_ml_dsa_{}", to))
}

#[tauri::command]
pub async fn cmd_get_balance(chain: String) -> Result<f64, String> {
    match chain.as_str() {
        "ETH" => Ok(1.24),
        "BTC" => Ok(0.005),
        _ => Ok(0.0),
    }
}
