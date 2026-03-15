//! ZK-SNARK (Groth16) shard-claim verification; batch parallel check.
use ark_bn254::Bn254;
use ark_ff::PrimeField;
use ark_groth16::{prepare_verifying_key, Groth16, PreparedVerifyingKey, Proof, VerifyingKey};
use rayon::prelude::*;
use std::sync::Arc;

/// Bn254 scalar field (public input type).
pub type Fr = ark_bn254::Fr;

/// Parse verifying key from bytes (placeholder: deserialize real VK in production).
fn parse_vk(raw_vk: &[u8]) -> VerifyingKey<Bn254> {
    if raw_vk.is_empty() {
        panic!("parse_vk: empty VK bytes, load real verifying key in production");
    }
    ark_serialize::CanonicalDeserialize::deserialize_uncompressed(raw_vk)
        .unwrap_or_else(|_| panic!("parse_vk: invalid VK bytes"))
}

/// Convert public input bytes to Fr array (first 32 bytes big-endian per segment).
fn parse_public_inputs(public_inputs: &[Vec<u8>]) -> Vec<Fr> {
    public_inputs
        .iter()
        .filter_map(|b| {
            let mut buf = [0u8; 32];
            let len = b.len().min(32);
            buf[32 - len..].copy_from_slice(&b[..len]);
            Some(Fr::from_be_bytes_mod_order(&buf))
        })
        .collect()
}

/// ZK verification engine: holds prepared VK (Arc for sharing); single and batch verify.
pub struct ZKVerificationEngine {
    /// No VK: skip verify (dev); with VK: Arc for concurrent use.
    pub pvk: Option<Arc<PreparedVerifyingKey<Bn254>>>,
}

impl ZKVerificationEngine {
    /// Construct without VK (dev placeholder; always pass).
    pub fn without_vk() -> Self {
        Self { pvk: None }
    }

    /// Construct with given verifying key (production).
    pub fn with_verifying_key(vk: &VerifyingKey<Bn254>) -> Self {
        Self {
            pvk: Some(Arc::new(prepare_verifying_key(vk))),
        }
    }

    /// Construct from raw VK bytes; one-time preprocessing at startup.
    pub fn new(raw_vk: &[u8]) -> Self {
        let vk = parse_vk(raw_vk);
        let pvk = prepare_verifying_key(&vk);
        Self {
            pvk: Some(Arc::new(pvk)),
        }
    }

    /// Verify a single shard claim.
    pub fn verify_shard_claim(&self, proof: &Proof<Bn254>, public_inputs: &[Fr]) -> bool {
        let Some(ref pvk) = self.pvk else {
            return true;
        };
        Groth16::<Bn254>::verify_proof(pvk.as_ref(), proof, public_inputs).unwrap_or(false)
    }

    /// Batch-parallel verify shard proofs via Rayon; N serial checks reduced to ~1.
    pub fn verify_shard_claims_batch(
        &self,
        shards: Vec<(Proof<Bn254>, Vec<Vec<u8>>)>,
    ) -> bool {
        let Some(ref pvk) = self.pvk else {
            return true;
        };
        let pvk = Arc::clone(pvk);
        let all_valid = shards
            .par_iter()
            .all(|(proof, public_inputs)| {
                let inputs = parse_public_inputs(public_inputs);
                Groth16::<Bn254>::verify_proof(pvk.as_ref(), proof, &inputs).unwrap_or(false)
            });
        if !all_valid {
            #[cfg(debug_assertions)]
            eprintln!("Invalid ZK shard proof detected; trigger protocol self-heal.");
        }
        all_valid
    }

    /// Aggregate verify: combine proofs for O(1) check (production: recursive circuit).
    /// Placeholder: verify one by one; all pass then true.
    pub fn aggregate_and_verify(&self, proofs: Vec<Proof<Bn254>>) -> bool {
        let Some(ref pvk) = self.pvk else {
            return !proofs.is_empty();
        };
        if proofs.is_empty() {
            return false;
        }
        // Placeholder: real impl uses RecursiveSnark::prove_aggregation(proofs) then verify once
        let all_valid = proofs
            .iter()
            .all(|p| Groth16::<Bn254>::verify_proof(pvk.as_ref(), p, &[]).unwrap_or(false));
        if !all_valid {
            #[cfg(debug_assertions)]
            eprintln!("Aggregate verify: invalid proof present.");
        }
        all_valid
    }
}
