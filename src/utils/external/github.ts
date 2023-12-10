import {GithubSponsor} from '@/types/subscription/github/webhook';


export const toGithubSponsorInfo = (sponsor: GithubSponsor) => {
  return `${sponsor.login} (${sponsor.email ?? 'Email unavailable'})`;
};
