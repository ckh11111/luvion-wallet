import { useEffect, useState } from 'react';
import { VaultService, NodeStatus } from '../services/vaultService';
import { useLuvionStore } from '../store/useLuvionStore';

export const ShardGrid = () => {
  const [nodes, setNodes] = useState<NodeStatus[]>([]);
  const isResharding = useLuvionStore((s) => s.isResharding);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const data = await VaultService.getNodesHealth();
        setNodes(data);
      } catch (e) {
        console.error('Failed to fetch nodes:', e);
      }
    };
    fetchNodes();
    const timer = setInterval(fetchNodes, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="grid grid-cols-6 gap-4 mt-8">
        {nodes.map((node) => (
          <div key={node.id} className="relative group">
            <div className={`
              h-20 rounded-2xl flex flex-col items-center justify-center border-2 transition-all
              ${node.online ? 'bg-white border-emerald-100 shadow-sm' : 'bg-gray-50 border-gray-100 opacity-50'}
            `}>
              <span className="text-xs font-black text-slate-400 mb-1">{node.id.toString().padStart(2, '0')}</span>
              <div className={`w-1.5 h-1.5 rounded-full ${node.online ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-gray-300'}`} />
            </div>
            {node.online && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {node.latency}ms
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-[10px] font-black uppercase text-slate-400">System Status</span>
        {isResharding ? (
          <div className="flex items-center gap-2 text-orange-500 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-[9px] font-bold">SELF-HEALING IN PROGRESS...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-emerald-500">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[9px] font-bold">SYSTEM SECURE</span>
          </div>
        )}
      </div>
    </>
  );
};
