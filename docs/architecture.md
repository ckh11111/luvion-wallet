# Luvion Protocol Architecture

## 1. 混合验证模型 (Hybrid Verification)
Luvion 采用传统的 ECDSA 签名与后量子加密 (PQC) 算法的混合模式，确保在当前环境下的兼容性以及对未来量子威胁的防御。

## 2. 分布式守护网格 (Distributed Guardian Mesh)
资产的“自愈”不依赖于单一实体，而是通过分布式的验证节点进行共识。只有当节点网络识别到异常模式（如异常大额转移）时，才会激活撤销窗口。

## 3. 自愈流程 (Self-Healing Workflow)
- **Monitoring**: 持续监控受保护地址的链上活动。
- **Trigger**: 发现异常交易。
- **Observation Window**: 开启可编程的延迟执行窗口（例如 15 分钟）。
- **Revocation**: 在窗口期内，用户可通过预设的恢复方案（如社交恢复或多重签名）撤销该交易。
