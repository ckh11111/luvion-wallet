/**
 * WebAuthn 生物验证：指纹/面容，验证成功后执行后续交易逻辑
 */

export async function handleBiometricVerify(
  onSuccess: () => void | Promise<void>,
  onError?: (err: unknown) => void
): Promise<boolean> {
  const challenge = new Uint8Array(32);
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(challenge);
  }

  const publicKeyCredentialCreationOptions: CredentialCreationOptions = {
    publicKey: {
      challenge,
      rp: { name: 'Luvion Protocol', id: window.location.hostname || 'localhost' },
      user: {
        id: new Uint8Array(Array.from('user_id', (c) => c.charCodeAt(0))),
        name: 'user@luvion.io',
        displayName: 'Luvion User',
      },
      pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
      authenticatorSelection: { authenticatorAttachment: 'platform' },
      timeout: 60000,
    },
  };

  try {
    const credential = await navigator.credentials.create(publicKeyCredentialCreationOptions);
    if (credential) {
      console.log('生物验证成功:', credential);
      await onSuccess();
      return true;
    }
    return false;
  } catch (err) {
    console.error('生物验证失败或取消:', err);
    onError?.(err);
    return false;
  }
}
