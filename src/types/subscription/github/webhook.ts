export type GithubSponsor = {
  login: string,
  email?: string | null,
};

export type GithubSponsorTier = {
  node_id: string,
};

export type GithubSponsorship = {
  sponsor: GithubSponsor | null,
  tier: GithubSponsorTier,
};

export type GithubWebhookPayload = {
  sponsorship: GithubSponsorship,
} & ({
  action: 'created' | 'cancelled' | 'tier_changed',
} | {
  action: 'pending_cancellation',
  effective_date: string,
});
