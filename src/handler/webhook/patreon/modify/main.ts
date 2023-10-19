import {removeActivation, updateActivationProperties} from '@/controller/user/activation/util';
import {toActivationProperties} from '@/handler/webhook/patreon/utils';
import {UserActivationContact} from '@/types/mongo/activation';
import {PatreonWebhookPayload} from '@/types/patreon/webhook';


export const handlePatreonPledgeModified = async (payload: PatreonWebhookPayload) => {
  const {email} = payload.data.attributes;

  const activationProperties = await toActivationProperties(payload);

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
