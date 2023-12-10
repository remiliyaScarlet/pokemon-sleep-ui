import {GithubSponsorData, GithubSponsorUser} from '@/types/subscription/github/data';
import {GithubWebhookPayload} from '@/types/subscription/github/webhook';
import {getActivationExpiryOfDefault} from '@/utils/user/activation/utils';


export const toGithubSponsorInfo = (sponsor: GithubSponsorUser) => {
  return `${sponsor.login} (${sponsor.email ?? 'Email unavailable'})`;
};

export const toGithubSponsorData = (payload: GithubWebhookPayload): GithubSponsorData => {
  const {action, sponsorship} = payload;
  const {sponsor, tier} = sponsorship;
  if (!sponsor) {
    throw new Error('No Github sponsor info available');
  }

  return {
    user: sponsor,
    expiry: (
      action === 'pending_cancellation' ?
        new Date(payload.effective_date) :
        getActivationExpiryOfDefault()
    ),
    tier: {
      id: tier.node_id,
      name: tier.name,
      monthlyPriceInCents: tier.monthly_price_in_cents,
    },
  };
};
