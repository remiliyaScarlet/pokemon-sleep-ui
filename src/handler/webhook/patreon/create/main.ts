import {actionSendActivationEmail} from '@/handler/action/activation/main';
import {toActivationPayloadFromPatreon} from '@/handler/patreon/utils';
import {PatreonWebhookPayload} from '@/types/patreon/webhook';


export const handlePatreonPledgeCreated = async (
  payload: PatreonWebhookPayload,
) => actionSendActivationEmail({
  payload: await toActivationPayloadFromPatreon(payload.data),
  sourceNote: 'Patreon Webhook',
  getWarnOnNullActivation: ({email}) => `Patreon member is inactive for email: ${email}`,
});
