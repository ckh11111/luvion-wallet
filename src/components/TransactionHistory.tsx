type Lang = 'zh' | 'en';

export const TransactionHistory = ({ lang }: { lang: Lang }) => {
  return (
    <div className="mt-10 space-y-4">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          {lang === 'zh' ? '交易活动' : 'Activity'}
        </h3>
        <span className="text-[9px] text-blue-500 font-bold animate-pulse">SYNCING...</span>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-slate-50 flex justify-between items-center group hover:border-blue-100 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
              <span className="text-sm font-bold text-slate-800 tracking-tight">Received LVN</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-black text-emerald-500">+450.00</div>
              <div className="text-[8px] text-slate-300 font-bold uppercase">Confirmed</div>
            </div>
          </div>
        ))}
        <div className="flex justify-center gap-1 pt-2 opacity-30">
          <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" />
          <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
          <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  );
};
