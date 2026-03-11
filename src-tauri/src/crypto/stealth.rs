use k256::{FieldBytes, ProjectivePoint, PublicKey, Scalar, SecretKey, U256};
use k256::elliptic_curve::{ops::Reduce, sec1::ToEncodedPoint};
use sha2::{Digest, Sha256};

fn hash_to_scalar(point: ProjectivePoint) -> Scalar {
    // 将共享点编码后哈希，再映射到标量域（占位实现，满足编译与闭环）
    let affine = point.to_affine();
    let ep = affine.to_encoded_point(false);
    let digest = Sha256::digest(ep.as_bytes());

    // 将 32 字节哈希输入约简到标量域
    let fb = FieldBytes::from_slice(digest.as_slice());
    <Scalar as Reduce<U256>>::reduce_bytes(fb)
}

pub fn generate_stealth_address(receiver_pubkey: PublicKey) -> (String, ProjectivePoint) {
    let ephemeral_sk = SecretKey::random(&mut rand::thread_rng());
    let ephemeral_pk = ephemeral_sk.public_key();

    // 执行 Diffie-Hellman 密钥交换
    let shared_secret = receiver_pubkey.to_projective() * *ephemeral_sk.to_nonzero_scalar();

    // 生成一次性目标地址 P
    let hashed_secret = hash_to_scalar(shared_secret);
    let stealth_pubkey =
        (ProjectivePoint::GENERATOR * hashed_secret) + receiver_pubkey.to_projective();

    (
        stealth_pubkey.to_affine().to_encoded_point(false).to_string(),
        ephemeral_pk.to_projective(),
    )
}

