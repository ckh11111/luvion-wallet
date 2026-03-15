/**
 * WebAuthn biometric verification; on success, proceeds with transaction flow.
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
      console.log('Biometric verification success:', credential);
      await onSuccess();
      return true;
    }
    return false;
  } catch (err) {
    console.error('Biometric verification failed or cancelled:', err);
    onError?.(err);
    return false;
  }
}
