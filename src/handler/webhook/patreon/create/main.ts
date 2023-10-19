import {generateActivationKey} from '@/controller/user/activation/key';
import {toActivationProperties} from '@/handler/webhook/patreon/utils';
import {PatreonWebhookPayload} from '@/types/patreon/webhook';
import {sendUserActivationEmail} from '@/utils/user/activation/email';


export const handlePatreonPledgeCreated = async (payload: PatreonWebhookPayload) => {
  const {email} = payload.included[1].attributes;

  const activationProperties = toActivationProperties(payload);

  if (!activationProperties) {
    console.warn(`Patreon received non-Paid charge status of user ${email}`);
    return;
  }

  const activationLink = await generateActivationKey({
    executorUserId: process.env.NEXTAUTH_ADMIN_UID,
    ...activationProperties,
  });

  await sendUserActivationEmail({recipient: email, activationLink});
};
