import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          assets: "Assets",
          recovery: "Recovery",
          settings: "Settings",
          footer: "Encrypted MPC Consensus Active",
          balance: "Total Balance",
          total_balance: "Total Balance",
          send: "Send",
          receive: "Receive",
          shards: "Shard Recovery",
          vault: "Vault",
          initialize: "Initialize",
          withdraw: "Withdraw",
          confirm_withdrawal: "Confirm Withdrawal",
          identity_verified: "Identity verified. Transaction broadcasting...",
          authenticating: "Authenticating...",
          verify_send: "Verify & Send",
          high_risk_warning: "Warning: This action will authorize the target contract to transfer your assets.",
          unlimited_approve: "Unlimited approval detected. Please proceed with caution.",
          close: "Close",
          receive_assets: "Receive Assets",
          your_address: "Your Public Address"
        }
      },
      zh: {
        translation: {
          assets: "资产",
          recovery: "分片自愈",
          settings: "设置",
          footer: "MPC 共识加密已激活",
          balance: "总余额",
          total_balance: "总余额",
          send: "发送",
          receive: "接收",
          shards: "分片恢复",
          vault: "保险库",
          initialize: "初始化加密",
          withdraw: "提现",
          confirm_withdrawal: "确认提现",
          identity_verified: "身份已验证。交易广播中...",
          authenticating: "验证中...",
          verify_send: "验证并发送",
          high_risk_warning: "警告：此操作将授权目标合约转移您的资产",
          unlimited_approve: "检测到无限额授权申请，请谨慎操作",
          close: "关闭",
          receive_assets: "接收资产",
          your_address: "您的公开地址"
        }
      }
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

i18n.on('languageChanged', () => {
  window.location.reload();
});

export default i18n;
