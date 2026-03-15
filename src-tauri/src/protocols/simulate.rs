#[derive(serde::Serialize)]
pub struct SimulationResult {
    pub risk_level: String, // "LOW", "MEDIUM", "HIGH"
    pub impact: String,     // Description of balance change
    pub warning: Option<String>,
}

#[tauri::command]
pub async fn cmd_simulate_transaction(to: String, data: String) -> Result<SimulationResult, String> {
    let _ = to;
    // Logic: call Tenderly or local sandbox for eth_call simulation; mock for now
    if data.contains("approve") {
        Ok(SimulationResult {
            risk_level: "HIGH".into(),
            impact: "Warning: this will authorize the target contract to move your assets".into(),
            warning: Some("Unlimited approval detected; proceed with caution.".into()),
        })
    } else {
        Ok(SimulationResult {
            risk_level: "LOW".into(),
            impact: "Estimated transfer: 0.5 ETH".into(),
            warning: None,
        })
    }
}

