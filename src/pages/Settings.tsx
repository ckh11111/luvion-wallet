import { useTranslation } from 'react-i18next';

export const Settings = () => {
  const { i18n } = useTranslation();

  return (
    <div className="p-12 max-w-2xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-12">Settings</h1>

      {/* 1. 语言选择 */}
      <section className="mb-12">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          {i18n.language === 'en' ? 'Language / 语言' : '语言 / Language'}
        </h2>
        <button
          onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}
          className="px-6 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition"
        >
          {i18n.language === 'en' ? 'Switch to 中文' : '切换至 English'}
        </button>
      </section>

      {/* 2. 恢复 RPC 节点模块 */}
      <section className="mb-12">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">RPC Nodes</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <span className="text-sm font-medium text-slate-700">Ethereum Mainnet</span>
            <span className="text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded uppercase font-bold">Active</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <span className="text-sm font-medium text-slate-700">Luvion PQC Mesh</span>
            <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-1 rounded uppercase font-bold">Encrypted</span>
          </div>
        </div>
      </section>

      {/* 3. 协议页脚 */}
      <div className="mt-20 opacity-40 text-center">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase">LUVION V1.0.0 STABLE</p>
        <p className="text-[8px] mt-1 uppercase tracking-widest">MPC-HE / Kademlia-Mesh / Merkle-Proof Active</p>
      </div>
    </div>
  );
};
