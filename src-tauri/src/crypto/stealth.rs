use k256::{FieldBytes, ProjectivePoint, PublicKey, Scalar, SecretKey, U256};
use k256::elliptic_curve::{ops::Reduce, sec1::ToEncodedPoint};
use sha2::{Digest, Sha256};

fn hash_to_scalar(point: ProjectivePoint) -> Scalar {
    // Encode shared point, hash, map to scalar (placeholder for compile/closure).
    let affine = point.to_affine();
    let ep = affine.to_encoded_point(false);
    let digest = Sha256::digest(ep.as_bytes());

    // Reduce 32-byte hash to scalar field.
    let fb = FieldBytes::from_slice(digest.as_slice());
    <Scalar as Reduce<U256>>::reduce_bytes(fb)
}

pub fn generate_stealth_address(receiver_pubkey: PublicKey) -> (String, ProjectivePoint) {
    let ephemeral_sk = SecretKey::random(&mut rand::thread_rng());
    let ephemeral_pk = ephemeral_sk.public_key();

    // Perform Diffie-Hellman key exchange.
    let shared_secret = receiver_pubkey.to_projective() * *ephemeral_sk.to_nonzero_scalar();

    // Generate one-time destination address P.
    let hashed_secret = hash_to_scalar(shared_secret);
    let stealth_pubkey =
        (ProjectivePoint::GENERATOR * hashed_secret) + receiver_pubkey.to_projective();

    (
        stealth_pubkey.to_affine().to_encoded_point(false).to_string(),
        ephemeral_pk.to_projective(),
    )
}

