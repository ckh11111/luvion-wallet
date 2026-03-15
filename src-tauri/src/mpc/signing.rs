//! Threshold signature aggregation: collect 22/33 shares asynchronously, combine when threshold reached.

use crate::core::config::LUVION_V1;
use futures::stream::{FuturesUnordered, StreamExt};
use std::future::Future;
use std::pin::Pin;

/// Handle to request a node's partial signature.
pub struct NodeHandle(pub u32);

impl NodeHandle {
    /// Request partial signature from this node (placeholder: real RPC/network).
    pub fn request_partial_sig(
        self,
    ) -> Pin<Box<dyn Future<Output = Result<PartialShare, SigningError>> + Send>> {
        Box::pin(async move { Ok(PartialShare(vec![0u8; 32])) })
    }
}

/// Partial signature from one node.
pub struct PartialShare(pub Vec<u8>);

/// Final aggregated signature.
pub struct FinalSignature(pub Vec<u8>);

/// Signing aggregation error.
#[derive(Debug)]
pub struct SigningError(pub String);

impl std::fmt::Display for SigningError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl std::error::Error for SigningError {}

impl From<&str> for SigningError {
    fn from(s: &str) -> Self {
        SigningError(s.to_string())
    }
}

/// Combine gathered shares into final signature (placeholder: real threshold protocol).
fn combine_shares(gathered_shares: Vec<PartialShare>) -> Result<FinalSignature, SigningError> {
    if gathered_shares.len() < LUVION_V1.signature_threshold {
        return Err("Insufficient shares to combine".into());
    }
    let mut out = Vec::new();
    for s in &gathered_shares[..LUVION_V1.signature_threshold] {
        out.extend_from_slice(&s.0);
    }
    Ok(FinalSignature(out))
}

/// Collect partial signatures from nodes; combine and return when 22 reached.
pub async fn aggregate_signature(
    partial_signatures: Vec<NodeHandle>,
) -> Result<FinalSignature, SigningError> {
    let mut responses: FuturesUnordered<
        Pin<Box<dyn Future<Output = Result<PartialShare, SigningError>> + Send>>,
    > = FuturesUnordered::new();

    for node in partial_signatures {
        responses.push(node.request_partial_sig());
    }

    let mut gathered_shares = Vec::new();

    while let Some(res) = responses.next().await {
        if let Ok(share) = res {
            gathered_shares.push(share);
        }

        if gathered_shares.len() >= LUVION_V1.signature_threshold {
            println!("Threshold reached: 22/33 signature shares collected, combining...");
            return combine_shares(gathered_shares);
        }
    }

    Err("Fatal: fewer than 22 valid signatures after all nodes responded".into())
}
