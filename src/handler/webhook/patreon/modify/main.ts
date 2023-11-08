import {getActivationPresetLookupOfSource} from '@/controller/user/activation/preset';
import {removeActivationSingle, updateActivationPropertiesSingle} from '@/controller/user/activation/util';
import {toActivationPayloadFromPatreon} from '@/handler/patreon/utils';
import {ActivationContact} from '@/types/mongo/activation';
import {PatreonWebhookPayload} from '@/types/patreon/webhook';


export const handlePatreonPledgeModified = async (payload: PatreonWebhookPayload) => {
  const presetLookup = await getActivationPresetLookupOfSource('patreon');

  const {email, activationProperties} = await toActivationPayloadFromPatreon({
    member: payload.data,
    presetLookup,
  });

  if (!activationProperties) {
    await removeActivationSingle({
      filter: {[`contact.${'patreon' satisfies ActivationContact}`]: email},
    });
    return;
  }

  await updateActivationPropertiesSingle({
    filter: {[`contact.${'patreon' satisfies ActivationContact}`]: email},
    properties: activationProperties,
  });
};
