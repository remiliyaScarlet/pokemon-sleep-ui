import {generateActivationKey} from '@/controller/user/activation/key';
import {toPatreonUserActivationPayload} from '@/handler/webhook/patreon/utils';
import {PatreonWebhookPayload} from '@/types/patreon/webhook';
import {sendUserActivationEmail} from '@/utils/user/activation/email';


export const handlePatreonPledgeCreated = async (payload: PatreonWebhookPayload) => {
  const {email, activationProperties} = await toPatreonUserActivationPayload(payload);

  if (!activationProperties) {
    console.warn(`Patreon received non-Paid charge status of user ${email}`);
    return;
  }

  const activationLink = await generateActivationKey({
    executorUserId: process.env.NEXTAUTH_ADMIN_UID,
    ...activationProperties,
  });

  // `activationLink` is null if the same source already have an active activation key
  if (!activationLink) {
    return;
  }

  await sendUserActivationEmail({recipient: email, activationLink});
  // eslint-disable-next-line no-console
  console.log(`Activation email sent to Patreon ${email} with link ${activationLink}`);
};
