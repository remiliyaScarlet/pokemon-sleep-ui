import {generateActivationKey} from '@/controller/user/account/activationKey';
import {PatreonWebhookPayload} from '@/types/patreon/webhook';
import {sendUserActivationEmail} from '@/utils/user/activation/email';
import {getActivationExpiry} from '@/utils/user/activation/utils';


export const handlePatreonPledgeCreated = async (payload: PatreonWebhookPayload) => {
  const {email, social_connections: social} = payload.included[1].attributes;
  const chargeStatus = payload.data.attributes.last_charge_status;

  if (chargeStatus !== 'Paid') {
    console.warn(`Patreon received non-Paid charge status of user ${email}`);
    return;
  }

  const activationLink = await generateActivationKey({
    executorUserId: process.env.NEXTAUTH_ADMIN_UID,
    expiry: getActivationExpiry(),
    activation: {
      adsFree: true,
      premium: true,
    },
    source: 'patreon',
    contact: {
      patreon: email,
      ...(social.discord ? {
        discord: `<@${social.discord.user_id}>`,
      } : {}),
    },
    isSpecial: false,
    note: '',
  });

  await sendUserActivationEmail({recipient: email, activationLink});
};
