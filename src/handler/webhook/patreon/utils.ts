import crypto from 'crypto';

import {getActivationPropertiesByPatreonContact} from '@/controller/user/activation/util';
import {ActionSendActivationEmailPayload} from '@/handler/action/activation/type';
import {getPatreonMember} from '@/handler/patreon/api/member/main';
import {PatreonWebhookPayload} from '@/types/patreon/webhook';
import {isPatronActive} from '@/utils/external/patreon';
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

  throw new Error(`Patreon signature mismatch / Hash: [E] ${expected} [A]: ${hash} / message: ${message}`);
};

export const toActivationPayloadFromPatreon = async (
  payload: PatreonWebhookPayload,
): Promise<ActionSendActivationEmailPayload> => {
  const {id, attributes} = payload.data;
  const {email} = attributes;

  if (!isPatronActive(payload.data)) {
    return {email, activationProperties: null};
  }

  const memberData = await getPatreonMember({userId: id});

  const social = memberData.included[0].attributes.social_connections;

  let existedActivationProperties;
  if (!social) {
    existedActivationProperties = (await getActivationPropertiesByPatreonContact(email));
  }

  /* eslint-disable no-console */
  console.log(`Patreon member data of ${id} (${email}):`, memberData);
  console.log(`Existed activation properties of ${email} on Patreon:`, existedActivationProperties);
  /* eslint-enable no-console */

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
        ...(
          // Use the Discord contact from the Patreon first
          // If not returned, the use the existing contact, if available
          social?.discord ?
            {
              discord: `<@${social.discord.user_id}>`,
            } :
            existedActivationProperties?.contact
        ),
      },
      isSpecial: false,
      note: '',
    },
  };
};
