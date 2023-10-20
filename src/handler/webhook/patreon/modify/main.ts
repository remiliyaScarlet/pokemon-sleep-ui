import {removeActivation, updateActivationProperties} from '@/controller/user/activation/util';
import {toPatreonUserActivationPayload} from '@/handler/webhook/patreon/utils';
import {UserActivationContact} from '@/types/mongo/activation';
import {PatreonWebhookPayload} from '@/types/patreon/webhook';


export const handlePatreonPledgeModified = async (payload: PatreonWebhookPayload) => {
  const {email, activationProperties} = await toPatreonUserActivationPayload(payload);

  if (!activationProperties) {
    await removeActivation({
      filter: {[`contact.${'patreon' satisfies UserActivationContact}`]: email},
    });
    return;
  }

  await updateActivationProperties({
    filter: {[`contact.${'patreon' satisfies UserActivationContact}`]: email},
    properties: activationProperties,
  });
};
