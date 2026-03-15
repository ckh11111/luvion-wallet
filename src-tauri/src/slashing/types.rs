//! Slashing types: address, errors, consensus auth.

/// Node address (aligned with chain/mesh ID; 20 bytes here).
#[derive(Clone, Copy, PartialEq, Eq, Hash)]
pub struct Address(pub [u8; 20]);

impl std::fmt::Display for Address {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "0x{}", hex::encode(self.0))
    }
}

/// Consensus vote signature (placeholder: BFT node signature on slash decision).
#[derive(Clone)]
pub struct Signature(pub Vec<u8>);

impl Signature {
    /// Verify signature; on failure return SlashingError.
    pub fn verify_or_fail(&self) -> Result<(), SlashingError> {
        // Placeholder: verify node pubkey and message digest in production
        if self.0.is_empty() {
            return Err(SlashingError::InvalidVoteSignature);
        }
        Ok(())
    }
}

/// Slashing flow errors.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum SlashingError {
    /// Caller not consensus-authorized.
    Unauthorized,
    /// Votes below BFT quorum (2/3+1).
    InsufficientQuorum,
    /// Vote signature verification failed.
    InvalidVoteSignature,
    /// Node already frozen; no double slash.
    AlreadyFrozen,
    /// Node not in malicious record.
    NotMalicious,
    /// Vault/token op failed.
    VaultError(String),
    /// Transfer to pool failed.
    TransferFailed(String),
    /// Mesh remove failed.
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

/// Consensus auth token: only created by consensus layer after slash consensus; only consensus may call execute_slashing.
#[derive(Clone, Copy)]
pub struct ConsensusAuth(());

impl ConsensusAuth {
    /// Only consensus module; obtain after slash consensus to call slash API. Do not construct elsewhere.
    #[allow(dead_code)]
    pub fn from_consensus_layer() -> Self {
        Self(())
    }
}
