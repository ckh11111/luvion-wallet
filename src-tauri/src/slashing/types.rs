//! 罚没相关类型：地址、错误、共识层鉴权

/// 节点地址（与链上/网格 ID 一致，此处用 20 字节表示）
#[derive(Clone, Copy, PartialEq, Eq, Hash)]
pub struct Address(pub [u8; 20]);

impl std::fmt::Display for Address {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "0x{}", hex::encode(self.0))
    }
}

/// 共识投票签名（占位：生产环境为 BFT 节点对罚没决议的签名）
#[derive(Clone)]
pub struct Signature(pub Vec<u8>);

impl Signature {
    /// 校验签名真实性，失败返回 SlashingError
    pub fn verify_or_fail(&self) -> Result<(), SlashingError> {
        // 占位：生产环境应校验节点公钥与消息摘要
        if self.0.is_empty() {
            return Err(SlashingError::InvalidVoteSignature);
        }
        Ok(())
    }
}

/// 罚没流程可能出现的错误
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum SlashingError {
    /// 调用方未持有共识层鉴权，无权执行罚没
    Unauthorized,
    /// 投票人数未达到 BFT 法定人数 (2/3+1)
    InsufficientQuorum,
    /// 投票签名校验失败
    InvalidVoteSignature,
    /// 节点已处于冻结期，不可重复罚没
    AlreadyFrozen,
    /// 节点未在恶意记录中，无需罚没
    NotMalicious,
    /// 质押/代币操作失败
    VaultError(String),
    /// 代币转入补偿池失败
    TransferFailed(String),
    /// 从网格移除节点失败
    MeshRemoveFailed(String),
}

impl std::fmt::Display for SlashingError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            SlashingError::Unauthorized => write!(f, "unauthorized: only consensus layer may slash"),
            SlashingError::InsufficientQuorum => write!(f, "insufficient quorum: need 2/3+1 votes"),
            SlashingError::InvalidVoteSignature => write!(f, "invalid vote signature"),
            SlashingError::AlreadyFrozen => write!(f, "node already in freeze period"),
            SlashingError::NotMalicious => write!(f, "node not marked malicious"),
            SlashingError::VaultError(s) => write!(f, "vault error: {}", s),
            SlashingError::TransferFailed(s) => write!(f, "transfer to pool failed: {}", s),
            SlashingError::MeshRemoveFailed(s) => write!(f, "mesh remove failed: {}", s),
        }
    }
}

impl std::error::Error for SlashingError {}

/// 共识层鉴权令牌：仅由网格共识层在达成罚没共识后创建并传入，
/// 确保只有共识层有权调用 `execute_slashing`。
#[derive(Clone, Copy)]
pub struct ConsensusAuth(());

impl ConsensusAuth {
    /// 仅由共识层模块调用，用于在达成罚没共识后获取鉴权并调用罚没接口。
    /// 业务代码不应直接构造此类型，而应通过共识层入口获取。
    #[allow(dead_code)]
    pub fn from_consensus_layer() -> Self {
        Self(())
    }
}
