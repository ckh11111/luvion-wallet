import { useLuvionNetwork } from '../hooks/useLuvionNetwork';
import { ShardGrid } from '../components/ShardGrid';
import { SafeHouseKit } from '../components/SafeHouseKit';

export const ShardRecovery = () => {
  const { nodeCount, isHealing } = useLuvionNetwork();

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl font-black text-slate-800">
          Shard Recovery ({nodeCount}/18)
        </h2>
        {isHealing && (
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
            </span>
            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-tighter">
              Self-Healing Protocol Active
            </span>
          </div>
        )}
      </div>
      <ShardGrid />
      <SafeHouseKit />
    </div>
  );
};
