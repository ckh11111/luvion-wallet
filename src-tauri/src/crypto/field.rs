/// Finite field ops placeholder (e.g. GF(2^256)).
pub struct FiniteField;

impl FiniteField {
    /// Field add placeholder: byte-wise add then mod.
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
