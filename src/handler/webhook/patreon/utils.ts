import crypto from 'crypto';

import {getPatreonMemberData} from '@/handler/webhook/patreon/api/member/main';
import {PatreonUserActivationPayload} from '@/handler/webhook/patreon/type';
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

export const toPatreonUserActivationPayload = async (
  payload: PatreonWebhookPayload,
): Promise<PatreonUserActivationPayload> => {
  const {id, attributes} = payload.data;
  const {
    email,
    last_charge_status: chargeStatus,
  } = attributes;

  if (chargeStatus !== 'Paid') {
    return {email, activationProperties: null};
  }

  const {
    social_connections: social,
  } = (await getPatreonMemberData({userId: id})).included[0].attributes;

  return {
    email,
    activationProperties: {
      expiry: getActivationExpiry(payload.data),
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
    },
  };
};
