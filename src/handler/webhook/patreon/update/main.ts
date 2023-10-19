import {PatreonWebhookPledgeUpdatedPayload} from '@/types/patreon/webhook/pledge/update';


export const handlePatreonPledgeUpdated = async (payload: PatreonWebhookPledgeUpdatedPayload) => {
  const {email} = payload.included[1].attributes;

  // No-op for now if the pledge has been updated
  console.warn(`Patreon pledge updated for email: ${email}`);
};
