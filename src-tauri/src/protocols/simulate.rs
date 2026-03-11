#[derive(serde::Serialize)]
pub struct SimulationResult {
    pub risk_level: String, // "LOW", "MEDIUM", "HIGH"
    pub impact: String,     // 资金变动描述
    pub warning: Option<String>,
}

#[tauri::command]
pub async fn cmd_simulate_transaction(to: String, data: String) -> Result<SimulationResult, String> {
    let _ = to;
    // 逻辑：调用 Tenderly 或本地沙盒节点进行 eth_call 模拟
    // 这里先给出一个逻辑闭环的 Mock 实现
    if data.contains("approve") {
        Ok(SimulationResult {
            risk_level: "HIGH".into(),
            impact: "警告：此操作将授权目标合约转移您的资产".into(),
            warning: Some("检测到无限额授权申请，请谨慎操作".into()),
        })
    } else {
        Ok(SimulationResult {
            risk_level: "LOW".into(),
            impact: "预计转出 0.5 ETH".into(),
            warning: None,
        })
    }
}

