import React from 'react';
import { useLuvionNetwork } from '../hooks/useLuvionNetwork';

export const ShardRecovery = () => {
  const { nodeCount } = useLuvionNetwork();
  const total = 33;
  const threshold = 12;
  const currentCount = Math.min(nodeCount, total);
  const collected = Math.min(currentCount, threshold);

  return (
    <div className="w-full max-w-2xl mx-auto p-8 pixel-font selection:bg-[#00FF41] selection:text-black">
      {/* 顶部终端 Header */}
      <div className="border-b-4 border-[#E0E0E0] pb-4 mb-8 flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-bold uppercase tracking-widest text-white">System_Recovery</h2>
          <p className="text-lg mt-1 text-[#00FF41] opacity-80">{'>'} LUVION_PROTOCOL // SSS-33</p>
        </div>
        <div className="text-right">
          <span className="text-[#00FF41] text-5xl font-bold leading-none">{currentCount}</span>
          <span className="text-2xl text-gray-500">/{total}</span>
        </div>
      </div>

      {/* 碎片收集矩阵 (只显示门限所需的 12 个) */}
      <div className="mb-12">
        <p className="text-xl mb-4 uppercase text-gray-400">Target_Threshold: {threshold} Nodes</p>

        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {Array.from({ length: threshold }).map((_, i) => (
            <div
              key={i}
              className={`
                aspect-square flex items-center justify-center text-2xl font-bold border-4 transition-none
                ${i < collected
                  ? 'bg-[#00FF41] border-[#00FF41] text-black shadow-[0_0_15px_rgba(0,255,65,0.4)]'
                  : 'bg-transparent border-[#333] text-[#333]'}
              `}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
          ))}
        </div>
      </div>

      {/* 终端状态输出 & 操作按钮 */}
      <div className="flex flex-col items-start gap-8 mt-4 border-t-2 border-dashed border-gray-700 pt-8">
        <div className="text-xl uppercase space-y-2 text-[#00FF41]">
          <p>{'>'} STATUS: <span className="text-white">{collected >= threshold ? 'THRESHOLD REACHED' : 'COLLECTING...'}</span></p>
          <p className="animate-pulse">{'>'} AWAITING BIOMETRIC SIGNATURE_</p>
        </div>

        <button
          type="button"
          className={`
            px-8 py-4 border-4 font-bold text-2xl uppercase tracking-widest transition-none
            ${collected >= threshold
              ? 'bg-[#E0E0E0] border-[#E0E0E0] text-black hover:bg-[#00FF41] hover:border-[#00FF41] active:translate-y-1'
              : 'bg-transparent border-[#444] text-[#444] cursor-not-allowed'}
          `}
          disabled={collected < threshold}
        >
          [ Execute_Verify ]
        </button>
      </div>
    </div>
  );
};
