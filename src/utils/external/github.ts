import {GithubSponsor} from '@/types/subscription/github/webhook';


export const toGithubSponsorInfo = (sponsor: GithubSponsor) => {
  return `${sponsor.id} (${sponsor.email ?? 'Email unavailable'})`;
};
