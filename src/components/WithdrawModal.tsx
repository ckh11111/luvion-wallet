import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { invoke } from '@tauri-apps/api/tauri';
import { TransactionPreview } from './TransactionPreview';

const LoadingSpinner = () => (
  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
);

const FingerprintIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 11a3 3 0 013 3c0 2.5-2 4-4 5l-1 1M7 16.5c-1.5-1-2.5-2.5-2.5-4.5a4.5 4.5 0 019 0c0 1.5-.5 3-1.5 4" />
    <path d="M5 20.5c-1-1.5-1.5-3.5-1.5-5.5a6.5 6.5 0 0113 0c0 2-.5 4-1.5 5.5" />
    <path d="M2 12h.01M22 12h.01M12 2v.01M12 22v.01" />
  </svg>
);

export const WithdrawModal = ({ onClose }: { onClose?: () => void }) => {
  const { t } = useTranslation();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [simulation, setSimulation] = useState<any | null>(null);

  const executeThresholdSignature = async () => {
    const sim = await invoke<any>('cmd_simulate_transaction', {
      to: '0x_receiver_placeholder',
      data: 'approve',
    });
    setSimulation(sim);
    const ok = await invoke<boolean>('cmd_trigger_biometric_2fa');
    if (ok) setMessage({ type: 'success', text: t('identity_verified') });
    else setMessage({ type: 'error', text: 'Authentication Failed.' });
  };

  const startWithdrawal = async () => {
    setIsAuthenticating(true);
    setMessage(null);
    try {
      const isAuth = await invoke<boolean>('authenticate_biometric');
      if (isAuth) {
        await executeThresholdSignature();
      } else {
        setMessage({ type: 'error', text: 'Authentication Failed.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Authentication Failed.' });
      try { console.error('Biometric failed', err); } catch { /* noop */ }
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight mb-4">
        {t('confirm_withdrawal')}
      </h2>

      {message && (
        <p className={`text-xs font-medium mb-4 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message.text}
        </p>
      )}

      {/* 风险警告区域 */}
      <div className="bg-red-50 p-4 rounded-xl border border-red-100 mb-6">
        <div className="flex items-center gap-2">
          <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">HIGH RISK</span>
          <span className="text-[11px] text-red-800 font-bold">{t('high_risk_warning')}</span>
        </div>
        <p className="text-[10px] text-red-600 mt-2">⚠️ {t('unlimited_approve')}</p>
      </div>

      <TransactionPreview simulation={simulation} />

      <button
        onClick={startWithdrawal}
        disabled={isAuthenticating}
        className="w-full bg-slate-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {isAuthenticating ? <LoadingSpinner /> : <FingerprintIcon />}
        {isAuthenticating ? t('authenticating') : t('verify_send')}
      </button>

      {onClose && (
        <div className="text-center mt-4">
          <button onClick={onClose} className="text-xs text-slate-400 hover:text-slate-600">
            {t('close')}
          </button>
        </div>
      )}
    </div>
  );
};
