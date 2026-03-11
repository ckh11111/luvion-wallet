// 生物识别校验占位，实际接入系统 API (Windows Hello / macOS LocalAuthentication)
pub fn verify_identity(auth_token: &[u8]) -> bool {
    !auth_token.is_empty()
}

/// 占位：无参调起系统生物识别，用于提现等流程
pub fn verify_identity_system() -> Result<(), String> {
    Ok(())
}

/// 占位：硬件级生物识别（TouchID / Windows Hello）
pub fn authenticate_with_hardware() -> Result<(), String> {
    Ok(())
}

/// 占位：异步生物验证，供 cmd_secure_withdraw 等使用
pub async fn biometric_verify() -> Result<bool, String> {
    Ok(true)
}

/// 占位：获取安全 token 用于 2FA
pub fn get_secure_token() -> Result<Vec<u8>, ()> {
    Ok(b"biometric_2fa_placeholder".to_vec())
}
