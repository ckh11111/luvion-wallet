import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

export const SafeHouseKit = () => {
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      await invoke('cmd_generate_emergency_kit');
      alert('Emergency kit generated and encrypted. Please print and store physically.');
    } catch {
      alert('Generation failed. Please retry.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <section className="mt-12 p-6 border-2 border-dashed border-slate-200 rounded-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Emergency Safe-House Kit</h3>
          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">
            Generate physically encrypted backup to preserve asset sovereignty when offline
          </p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="bg-red-50 text-red-600 text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all disabled:opacity-60"
        >
          {generating ? 'Generating...' : 'Backup now'}
        </button>
      </div>
    </section>
  );
};
