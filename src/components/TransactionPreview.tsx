type SimulationResult = {
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | string;
  impact: string;
  warning?: string | null;
};

export const TransactionPreview = ({ simulation }: { simulation?: SimulationResult | null }) => {
  if (!simulation) return null;

  const isHigh = simulation.risk_level === 'HIGH';

  return (
    <div
      className={`p-4 rounded-xl mt-4 border ${
        isHigh ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
            isHigh ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
          }`}
        >
          {simulation.risk_level} Risk
        </span>
        <span className="text-xs text-slate-700 font-medium">{simulation.impact}</span>
      </div>
      {simulation.warning && (
        <p className="text-[10px] text-red-600 mt-2 font-bold">⚠️ {simulation.warning}</p>
      )}
    </div>
  );
};

