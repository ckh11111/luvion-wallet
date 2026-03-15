use crate::crypto::merkle;

/// Validate node data; on failure trigger frontend alert (placeholder: log only).
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

/// Placeholder: in production use Tauri AppHandle::emit to frontend.
fn emit_frontend_event(name: &str, index: usize) {
    println!("[P2P Validator] {} node_index={}", name, index);
}
