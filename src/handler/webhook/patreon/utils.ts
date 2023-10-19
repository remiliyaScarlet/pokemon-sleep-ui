import crypto from 'crypto';

import {UserActivationProperties} from '@/types/mongo/activation';
import {PatreonResponse} from '@/types/patreon/common/response';
import {PatreonUser} from '@/types/patreon/common/user';
import {PatreonWebhookPayload} from '@/types/patreon/webhook';
import {getActivationExpiry} from '@/utils/user/activation/utils';


type ThrowIfSignatureFailedOpts = {
  message: string,
  expected: string | null,
};

export const throwIfSignatureFailed = ({message, expected}: ThrowIfSignatureFailedOpts) => {
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

  throw new Error(`Patreon signature mismatch / message: ${message}`);
};

export const toActivationProperties = async (
  payload: PatreonWebhookPayload,
): Promise<UserActivationProperties | null> => {
  const {
    access_expires_at: accessExpiry,
    last_charge_status: chargeStatus,
  } = payload.data.attributes;

  const userResponse = await fetch(payload.data.relationships.user.links.related);
  const userData = await userResponse.json() as PatreonResponse<PatreonUser>;

  const {email, social_connections: social} = userData.data.attributes;

  if (chargeStatus !== 'Paid') {
    return null;
  }

  return {
    expiry: getActivationExpiry(accessExpiry),
    activation: {
      adsFree: true,
      premium: true,
    },
    source: 'patreon',
    contact: {
      patreon: email,
      ...(social.discord ? {
        discord: `<@${social.discord.user_id}>`,
      } : {}),
    },
    isSpecial: false,
    note: '',
  };
};
