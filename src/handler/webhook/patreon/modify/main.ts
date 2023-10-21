import {removeActivation, updateActivationProperties} from '@/controller/user/activation/util';
import {toActivationPayloadFromPatreon} from '@/handler/webhook/patreon/utils';
import {ActivationContact} from '@/types/mongo/activation';
import {PatreonWebhookPayload} from '@/types/patreon/webhook';


export const handlePatreonPledgeModified = async (payload: PatreonWebhookPayload) => {
  const {email, activationProperties} = await toActivationPayloadFromPatreon(payload);

  if (!activationProperties) {
    await removeActivation({
      filter: {[`contact.${'patreon' satisfies ActivationContact}`]: email},
    });
    return;
  }

  await updateActivationProperties({
    filter: {[`contact.${'patreon' satisfies ActivationContact}`]: email},
    properties: activationProperties,
  });
};
