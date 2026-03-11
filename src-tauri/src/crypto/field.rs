/// 有限域运算占位（实际可接入 GF(2^256) 等）
pub struct FiniteField;

impl FiniteField {
    /// 域上加法占位：字节逐位加后取模
    pub fn add(a: &[u8], b: &[u8]) -> Vec<u8> {
        let len = a.len().max(b.len());
        let mut out = vec![0u8; len];
        for i in 0..len {
            let x = a.get(i).copied().unwrap_or(0);
            let y = b.get(i).copied().unwrap_or(0);
            out[i] = x.wrapping_add(y);
        }
        out
    }
}
