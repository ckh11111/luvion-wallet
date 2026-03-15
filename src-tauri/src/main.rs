#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(dead_code, unused_imports, unused_variables)]

mod consensus;
mod contracts;
mod core;
mod crypto;
mod epoch;
mod mpc;
mod p2p;
mod protocols;
mod sdk;
mod security;
mod slashing;
mod vault;

#[tokio::main]
async fn main() {
    let _p2p_handle = tokio::spawn(async move {
        let _ = p2p::run_p2p_mesh().await;
    });

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            vault::commands::cmd_biometric_auth,
            vault::commands::cmd_trigger_biometric_2fa,
            vault::commands::cmd_init_pqc_vault,
            vault::commands::cmd_check_nodes,
            vault::commands::cmd_request_biometric_withdraw,
            vault::commands::cmd_secure_withdraw,
            vault::commands::cmd_generate_emergency_kit,
            vault::commands::cmd_create_vault,
            vault::commands::authenticate_user,
            vault::commands::authenticate_biometric,
            vault::commands::start_receive_monitor,
            protocols::atomic_swap::cmd_atomic_swap,
            protocols::commands::cmd_sign_tx,
            protocols::commands::cmd_get_balance,
            protocols::withdraw::cmd_execute_withdraw,
            protocols::simulate::cmd_simulate_transaction,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
