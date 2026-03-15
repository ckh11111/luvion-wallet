//! 门限签名聚合：异步收集 22/33 份额，达阈值即合成

use crate::core::config::LUVION_V1;
use futures::stream::{FuturesUnordered, StreamExt};
use std::future::Future;
use std::pin::Pin;

/// 节点句柄：用于请求该节点的部分签名
pub struct NodeHandle(pub u32);

impl NodeHandle {
    /// 向该节点请求部分签名（占位：实际为 RPC/网络请求）
    pub fn request_partial_sig(
        self,
    ) -> Pin<Box<dyn Future<Output = Result<PartialShare, SigningError>> + Send>> {
        Box::pin(async move { Ok(PartialShare(vec![0u8; 32])) })
    }
}

/// 单节点返回的签名份额
pub struct PartialShare(pub Vec<u8>);

/// 聚合后的最终签名
pub struct FinalSignature(pub Vec<u8>);

/// 签名聚合错误
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

/// 将收集到的份额合成为最终签名（占位：实际为门限签名协议）
fn combine_shares(gathered_shares: Vec<PartialShare>) -> Result<FinalSignature, SigningError> {
    if gathered_shares.len() < LUVION_V1.signature_threshold {
        return Err("份额不足，无法合成".into());
    }
    let mut out = Vec::new();
    for s in &gathered_shares[..LUVION_V1.signature_threshold] {
        out.extend_from_slice(&s.0);
    }
    Ok(FinalSignature(out))
}

/// 异步收集各节点部分签名，凑齐 22 个即合成并返回
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
            println!("✅ 阈值达成：已收集 22/33 签名碎片，正在合成...");
            return combine_shares(gathered_shares);
        }
    }

    Err("❌ 严重错误：在所有节点响应后仍未凑齐 22 个合法签名".into())
}
