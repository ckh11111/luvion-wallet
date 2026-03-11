import { invoke } from '@tauri-apps/api/tauri';

export interface LuvionWalletService {
  getVaultStatus(): Promise<string>;
  generatePqcKeys(): Promise<Uint8Array>;
  splitSecretIntoShards(secret: Uint8Array): Promise<Array<Uint8Array>>;
}

class TauriWalletService implements LuvionWalletService {
  
  async getVaultStatus(): Promise<string> {
    try {
      return await invoke<string>('get_vault_status');
    } catch (error) {
      console.error('Failed to get vault status:', error);
      throw new Error('Vault connection failed.');
    }
  }

  async generatePqcKeys(): Promise<Uint8Array> {
    try {
      const pkBytes = await invoke<number[]>('generate_keys');
      return new Uint8Array(pkBytes);
    } catch (error) {
      throw new Error('Key generation failed.');
    }
  }

  async splitSecretIntoShards(secret: Uint8Array): Promise<Array<Uint8Array>> {
    try {
      const secretArray = Array.from(secret);
      const shardsData = await invoke<number[][]>('split_into_shards', { secret: secretArray });
      return shardsData.map(shard => new Uint8Array(shard));
    } catch (error) {
      throw new Error('Shard splitting failed.');
    }
  }
}

export const walletService = new TauriWalletService();
