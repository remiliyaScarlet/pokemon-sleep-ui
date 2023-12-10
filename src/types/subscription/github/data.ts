export type GithubSponsorUser = {
  login: string,
  // This is an empty string if the email is set to private
  email?: string | null,
};

export type GithubSponsorTier = {
  id: string,
  name: string,
  monthlyPriceInCents: number,
};

export type GithubSponsorData = {
  user: GithubSponsorUser,
  tier: GithubSponsorTier,
  expiry: Date,
};
