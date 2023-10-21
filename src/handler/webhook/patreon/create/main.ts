import {actionSendActivationEmail} from '@/handler/action/activation/main';
import {toActivationPayloadFromPatreon} from '@/handler/webhook/patreon/utils';
import {PatreonWebhookPayload} from '@/types/patreon/webhook';


export const handlePatreonPledgeCreated = async (
  payload: PatreonWebhookPayload,
) => actionSendActivationEmail({
  payload: await toActivationPayloadFromPatreon(payload),
  sourceNote: 'Patreon Webhook',
  getWarnOnNullActivation: ({email}) => `Patreon received non-Paid charge status of user ${email}`,
});
