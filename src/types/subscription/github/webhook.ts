import {GithubSponsorUser} from '@/types/subscription/github/data';


export type GithubWebhookSponsorTier = {
  node_id: string,
  name: string,
  monthly_price_in_cents: number,
};

export type GithubWebhookSponsorData = {
  sponsor: GithubSponsorUser | null,
  tier: GithubWebhookSponsorTier,
};

export type GithubWebhookPayload = {
  sponsorship: GithubWebhookSponsorData,
} & ({
  action: 'created' | 'cancelled' | 'tier_changed',
} | {
  action: 'pending_cancellation',
  effective_date: string,
});
