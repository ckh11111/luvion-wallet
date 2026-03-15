//! Network and threshold config: DVC 33 nodes, t=22 per whitepaper.

/// Staker pool size, committee size, and signature threshold.
#[derive(Clone, Copy, Debug)]
pub struct NetworkConfig {
    /// Total staker pool (candidate pool).
    pub total_stakers: usize,
    /// Active committee size (current round).
    pub committee_size: usize,
    /// Signature threshold (2/3+1 minimum to sign).
    pub signature_threshold: usize,
}

/// Luvion V1: 100 staker pool, 33 committee, 22 threshold.
pub const LUVION_V1: NetworkConfig = NetworkConfig {
    total_stakers: 100,
    committee_size: 33,
    signature_threshold: 22,
};

/// L-SG revocation window (hours).
pub const REVOCATION_WINDOW_HOURS: u64 = 24;
/// L-SG extended revocation window on anomaly (hours).
pub const EMERGENCY_EXTEND_HOURS: u64 = 72;
