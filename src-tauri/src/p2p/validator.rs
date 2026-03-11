use crate::crypto::merkle;

/// 校验节点数据；失败时触发前端告警事件（占位：仅打日志）
pub fn validate_node_data(
    root: [u8; 32],
    index: usize,
    data: &[u8],
    proof: Vec<[u8; 32]>,
) -> bool {
    if !merkle::verify(root, index, data, proof) {
        emit_frontend_event("NODE_ATTACK_DETECTED", index);
        return false;
    }
    true
}

/// 占位：实际可通过 Tauri AppHandle::emit 推送到前端
fn emit_frontend_event(name: &str, index: usize) {
    println!("[P2P Validator] {} node_index={}", name, index);
}
