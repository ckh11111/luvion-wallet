// 紧急恢复包：18 分片关键信息加密后生成 PDF/二维码元数据
use super::encrypt_recovery_bundle;

pub fn generate_emergency_kit() -> Result<String, String> {
    // 将 18 个分片中的关键信息利用用户主密钥再次加密
    // 生成一个 PDF 或 QR 码，包含恢复元数据
    let backup_blob = encrypt_recovery_bundle()?;
    Ok(backup_blob) // 返回给前端生成二维码
}
