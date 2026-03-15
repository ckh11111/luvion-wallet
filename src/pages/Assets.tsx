import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getAddress } from 'ethers';
import QRCode from 'react-qr-code';
import { useLuvionStore } from '../store/useLuvionStore';
import { TransactionHistory } from '../components/TransactionHistory';
import { WithdrawModal } from '../components/WithdrawModal';

const RAW_ADDRESS = '0x71c8888888888888888888888888888888888888';

export const Assets = () => {
  const { t } = useTranslation();
  const s = useLuvionStore();
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showReceive, setShowReceive] = useState(false);
  const validAddress = useMemo(() => {
    try {
      return getAddress(RAW_ADDRESS);
    } catch {
      return RAW_ADDRESS;
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(validAddress);
    alert('Address copied. Paste it into your withdrawal form.');
  };

  return (
    <div className="animate-in fade-in">
      <div className="bg-[#0F172A] rounded-[2.5rem] p-12 text-white shadow-2xl relative">
        <p className="text-slate-500 font-bold uppercase text-xs mb-6 tracking-widest">{t('total_balance')}</p>
        <div className="text-8xl font-light mb-12">$0.00 <span className="text-xl text-slate-600">USD</span></div>
        <div className="flex gap-4 mt-8">
          <button onClick={() => s.initVault()} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200">
            {t('initialize')}
          </button>
          <button onClick={() => setShowReceive(true)} className="flex-1 bg-slate-200 text-slate-900 py-3 rounded-xl font-bold hover:bg-slate-300 transition">
            {t('receive')}
          </button>
          <button onClick={() => setShowWithdraw(true)} className="flex-1 bg-slate-200 text-slate-900 py-3 rounded-xl font-bold">
            {t('withdraw')}
          </button>
        </div>
        {showWithdraw && (
          <div className="mt-6 max-w-md">
            <WithdrawModal onClose={() => setShowWithdraw(false)} />
          </div>
        )}
      </div>
      <div className="mt-8 font-mono text-sm text-slate-400">Address: {s.address}</div>

      {showReceive && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white p-10 rounded-[32px] max-w-sm w-full shadow-2xl">
            <h2 className="text-xl font-black mb-6 text-slate-900 tracking-tight text-center">
              {t('receive_assets')}
            </h2>
            <div className="bg-white p-4 rounded-2xl border-4 border-slate-50 flex justify-center mb-8 shadow-inner">
              <QRCode
                value={validAddress}
                size={200}
                level="M"
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              />
            </div>
            <div className="text-center space-y-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('your_address')}</p>
              <div
                role="button"
                tabIndex={0}
                onClick={copyToClipboard}
                onKeyDown={(e) => e.key === 'Enter' && copyToClipboard()}
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition text-left"
              >
                <p className="text-[12px] font-mono break-all text-slate-800">
                  {validAddress}
                </p>
                <p className="text-[10px] text-blue-600 mt-1 font-bold underline">Click here to copy standard address</p>
              </div>
            </div>
            <button
              onClick={() => setShowReceive(false)}
              className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:scale-[0.98] transition-transform"
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}

      <div className="mt-12 space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Multi-Chain Assets</h3>
        {['LUVION', 'ETH', 'BTC'].map((chain) => (
          <div key={chain} className="group bg-white border border-slate-100 p-6 rounded-[2rem] flex justify-between items-center hover:shadow-xl transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-bold text-xs uppercase">
                {chain.substring(0, 1)}
              </div>
              <div>
                <div className="font-black text-slate-900 tracking-tight">{chain} Network</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Post-Quantum Protected</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-black text-xl text-slate-900 tracking-tighter">
                {s.balances[chain] ?? '0.00'} <span className="text-xs text-slate-400 font-bold">{chain}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <TransactionHistory lang={s.lang} />
    </div>
  );
};
