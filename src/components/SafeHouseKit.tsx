import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

export const SafeHouseKit = () => {
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      await invoke('cmd_generate_emergency_kit');
      alert('紧急逃生套件已生成并加密，请打印后物理锁存。');
    } catch {
      alert('生成失败，请重试。');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <section className="mt-12 p-6 border-2 border-dashed border-slate-200 rounded-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">紧急逃生舱 / Safe-House Kit</h3>
          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">
            生成物理级加密备份，确保极端断网环境下的资产主权
          </p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="bg-red-50 text-red-600 text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all disabled:opacity-60"
        >
          {generating ? '生成中...' : '立即备份'}
        </button>
      </div>
    </section>
  );
};
