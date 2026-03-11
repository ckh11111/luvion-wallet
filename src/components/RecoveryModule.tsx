import { useEffect } from 'react';
import { useVaultStore } from '../store/useVaultStore';

export const RecoveryModule = () => {
  const { nodes, fetchNodes } = useVaultStore();
  useEffect(() => {
    fetchNodes();
    const t = setInterval(fetchNodes, 5000);
    return () => clearInterval(t);
  }, [fetchNodes]);

  const onlineCount = nodes.filter((n) => n.online).length;
  const progress = (onlineCount / 10) * 100;
  const isReady = onlineCount >= 10;

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
      <div className="flex justify-between items-end mb-4">
        <h3 className="text-xl font-black">Shard Recovery ({onlineCount}/18)</h3>
        <span className={`text-xs font-bold ${isReady ? 'text-blue-600' : 'text-orange-500'}`}>
          {isReady ? 'READY TO RESTORE' : 'WAITING FOR NODES'}
        </span>
      </div>

      <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-8">
        <div
          className={`h-full transition-all duration-1000 ease-out ${isReady ? 'bg-blue-600' : 'bg-orange-400'}`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <div className="grid grid-cols-6 gap-3">
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`h-12 rounded-xl border-2 flex items-center justify-center font-mono text-[10px] font-bold transition-all
            ${node.online ? 'border-blue-100 text-blue-600 bg-blue-50/30' : 'border-slate-50 text-slate-300'}`}
          >
            {node.id.toString().padStart(2, '0')}
          </div>
        ))}
      </div>
    </div>
  );
};
