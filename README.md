# Luvion Wallet

Luvion 是一款基于后量子安全架构设计的资产管理终端。通过分布式验证与分片自愈机制，项目实现了资产安全边界的物理级加固。

---

## 核心痛点与价值 (Value Proposition)

传统的加密钱包存在严重的「单点故障」问题：私钥一旦泄露或丢失，资产即宣告永久遗失。Luvion 钱包通过以下机制解决了该痛点：

1. **分布式安全 (Shard-based Security)**: 我们不依赖单一私钥，而是通过门限密钥分享（Sharding）将资产控制权分布在多个节点，彻底消除黑客针对单点攻击的可能性。
2. **量子安全自愈 (Quantum-Safe Recovery)**: 针对后量子计算时代的威胁，我们集成了抗量子加密算法。当检测到威胁或节点异常时，Luvion 能够利用动态聚合机制，在无需人工干预的情况下完成资产状态的自愈。
3. **安全透明度 (Trustless Verification)**: 所有的节点共识逻辑与智能合约接口均开源且可验证，确保用户始终拥有资产的最终话语权。

---

## 技术栈对齐 (Technical Stack)

### 1. 核心架构层 (Architecture)
- **Tauri 2.0 & Rust**: 采用 Rust 作为后端核心，利用其内存安全性隔离敏感操作，确保底层运行环境稳固。
- **React & Tailwind CSS**: 构建前端交互逻辑，实现资产状态的实时同步与节点恢复数据的动态展示。

### 2. 安全与共识层 (Security & Consensus)
- **Shard Recovery (分片自愈)**: 对应仓库内 App.tsx 中的核心逻辑。实现了基于门限解密机制的验证流程，当网络活跃分片达到 12/33（门限值）时，系统自动触发资产恢复逻辑。
- **Distributed Consensus**: 对应仓库中的 consensus/ 目录。包含 P2P 节点发现协议与分布式验证逻辑，消除单点故障风险。
- **Quantum-Safe Storage**: 系统底层集成后量子加密算法，所有资产条目均经过加密加固处理。

### 3. 合约与接口 (Contracts & Interfaces)
- **Rust Contracts**: 对应 contracts/ 目录。包含 Luvion 协议的业务逻辑实现，负责资产操作的链上与链下双重校验。
- **Standard Interface**: 对应 ILuvion.sol。定义了钱包协议与区块链智能合约交互的标准接口规范。

---

## 快速启动

```bash
# 安装依赖
npm install

# 启动开发环境
npm run dev
```

---

## Collaboration

We are looking for security researchers and protocol engineers to audit our revocation workflow.  
**Contact:** [luvion.labs@gmail.com](mailto:luvion.labs@gmail.com)

---

## License

CC BY-NC-ND 4.0
