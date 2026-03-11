import { useLuvionStore } from '../store/useLuvionStore';

export function useLuvionNetwork() {
  const nodes = useLuvionStore((s) => s.nodes);
  const isResharding = useLuvionStore((s) => s.isResharding);

  const nodeCount = Array.isArray(nodes)
    ? nodes.filter((n: { online?: boolean }) => n.online).length
    : 0;

  return { nodeCount, isHealing: isResharding };
}
