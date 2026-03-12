//! 网络与门限配置：与白皮书 DVC 33 节点、t=22 一致

/// 全网质押节点池、委员会规模与门限
#[derive(Clone, Copy, Debug)]
pub struct NetworkConfig {
    /// 全网质押节点池规模（候补池）
    pub total_stakers: usize,
    /// 活跃委员会规模（当值节点数）
    pub committee_size: usize,
    /// 门限阈值（2/3+1，签名所需最少节点数）
    pub signature_threshold: usize,
}

/// Luvion V1：100 候补池，33 委员会，22 门限
pub const LUVION_V1: NetworkConfig = NetworkConfig {
    total_stakers: 100,
    committee_size: 33,
    signature_threshold: 22,
};

/// L-SG 撤销窗口（小时）
pub const REVOCATION_WINDOW_HOURS: u64 = 24;
/// L-SG 异常时延长撤销窗口（小时）
pub const EMERGENCY_EXTEND_HOURS: u64 = 72;
