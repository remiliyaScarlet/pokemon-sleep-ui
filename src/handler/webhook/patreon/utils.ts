import crypto from 'crypto';


type ThrowIfPatreonSignatureFailedOpts = {
  message: string,
  expected: string | null,
};

export const throwIfPatreonSignatureFailed = ({message, expected}: ThrowIfPatreonSignatureFailedOpts) => {
  if (!expected) {
    throw new Error(`Patreon signature is empty / message: ${message}`);
  }

  const hash = crypto
    .createHmac('md5', process.env.EXTERNAL_PATREON_WEBHOOK_SECRET)
    .update(message)
    .digest('hex');

  if (crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(expected.padEnd(hash.length)))) {
    return;
  }

  throw new Error(`Patreon signature mismatch / Hash: [E] ${expected} [A]: ${hash} / message: ${message}`);
};
