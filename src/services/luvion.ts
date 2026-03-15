import { invoke } from '@tauri-apps/api/tauri';

export interface CreateSafeOptions {
  owner: string;
  security?: 'Standard' | 'Institutional' | 'Quantum-Safe';
  revocation?: string;
}

export interface SafeWallet {
  address: string;
}

/**
 * One-line API to create a protected vault (quantum-safe / L-SG configurable).
 */
export const Luvion = {
  async createSafe(options: CreateSafeOptions): Promise<SafeWallet> {
    const { owner, security = 'Quantum-Safe', revocation = '24h' } = options;
    const address = await invoke<string>('cmd_create_vault', {
      owner,
      security,
      revocation,
    });
    return { address };
  },
};
