//! L-SG vault logic: within revocation window, release allowed only when consensus is stable.

use crate::consensus::{NetworkState, NetworkStatus, ViewChangeManager};
use crate::core::config::REVOCATION_WINDOW_HOURS;

/// Liveness lock: forbid release when not Optimal, return error.
pub fn ensure_release_allowed(network_manager: &ViewChangeManager) -> Result<(), String> {
    if network_manager.get_status() != NetworkStatus::Optimal {
        return Err(
            "Network consensus unstable; L-SG revocation window suspended, assets frozen for safety.".to_string(),
        );
    }
    Ok(())
}

/// L-SG vault: tx timestamp and current time for revocation window check.
pub struct LuvionVault {
    /// Transaction timestamp (seconds)
    pub tx_timestamp: u64,
    /// Current chain/system time (seconds)
    pub current_time: u64,
}

impl LuvionVault {
    /// Whether the asset is past the revocation window and can be released.
    /// If network is ViewChanging or Suspended, always deny release.
    pub fn is_safe_to_release(&self, network_state: &NetworkState) -> bool {
        if matches!(
            network_state,
            NetworkState::ViewChanging(_) | NetworkState::Suspended
        ) {
            eprintln!(
                "Release blocked: network consensus unstable, L-SG window frozen."
            );
            return false;
        }

        self.current_time >= self.tx_timestamp + REVOCATION_WINDOW_HOURS * 3600
    }
}
