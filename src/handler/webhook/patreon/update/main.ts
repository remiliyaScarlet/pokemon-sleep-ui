import {PatreonWebhookPayload} from '@/types/patreon/webhook';


export const handlePatreonPledgeUpdated = async (payload: PatreonWebhookPayload) => {
  const {email} = payload.included[1].attributes;

  // No-op for now if the pledge has been updated
  console.warn(`Patreon pledge updated for email: ${email}`);
};
