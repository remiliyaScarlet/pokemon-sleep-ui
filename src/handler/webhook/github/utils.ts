import crypto from 'crypto';


const encoder = new TextEncoder();

const hexToBytes = (hex: string): Uint8Array => {
  const len = hex.length / 2;
  const bytes = new Uint8Array(len);

  let index = 0;
  for (let i = 0; i < hex.length; i += 2) {
    const c = hex.slice(i, i + 2);
    bytes[index] = parseInt(c, 16);
    index += 1;
  }

  return bytes;
};

type ThrowIfGithubSignatureFailedOpts = {
  message: string,
  expected: string | null,
};

export const throwIfGithubSignatureFailed = async ({
  message,
  expected,
}: ThrowIfGithubSignatureFailedOpts) => {
  if (!expected) {
    throw new Error(
      `Expected hash unavailable when validating Github webhook signature of the message: ${JSON.stringify(message)}`,
    );
  }

  const parts = expected.split('=');
  const signatureHex = parts[1];

  const algorithm: crypto.webcrypto.HmacKeyGenParams = {
    name: 'HMAC',
    hash: {
      name: 'SHA-256',
    },
  };

  const keyBytes = encoder.encode(process.env.EXTERNAL_GITHUB_WEBHOOK_SECRET);
  const extractable = false;
  const key = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    algorithm,
    extractable,
    ['sign', 'verify'],
  );

  const signatureBytes = hexToBytes(signatureHex);
  const dataBytes = encoder.encode(message);
  const pass = await crypto.subtle.verify(
    algorithm.name,
    key,
    signatureBytes,
    dataBytes,
  );

  if (pass) {
    return;
  }

  throw new Error(`Github signature mismatch / Hash: [E] ${expected} / message: ${message}`);
};
