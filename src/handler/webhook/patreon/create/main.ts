import {getActivationPresetLookupOfSource} from '@/controller/user/activation/preset';
import {actionSendActivationEmail} from '@/handler/action/activation/main';
import {toActivationPayloadFromPatreon} from '@/handler/shared/patreon/utils';
import {PatreonWebhookPayload} from '@/types/subscription/patreon/webhook';


export const handlePatreonPledgeCreated = async (
  payload: PatreonWebhookPayload,
) => {
  const presetLookup = await getActivationPresetLookupOfSource('patreon');

  return actionSendActivationEmail({
    payload: await toActivationPayloadFromPatreon({member: payload.data, presetLookup}),
    sourceNote: 'Patreon Webhook',
    getWarnOnNullActivation: ({contact}) => `Patreon member is inactive for email: ${contact}`,
  });
};
