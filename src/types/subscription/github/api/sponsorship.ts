import {GithubApiResponse} from '@/types/subscription/github/api/base';
import {GithubApiPageInfo} from '@/types/subscription/github/api/pageInfo';


export type GithubApiSponsorship = {
  isActive: boolean,
  sponsorEntity: {
    login: string,
    email: string,
  },
  tier: {
    id: string,
    name: string,
    monthlyPriceInCents: number,
  },
};

export type GithubApiSponsorshipResponse = GithubApiResponse<{
  user: {
    sponsorshipsAsMaintainer: {
      nodes: GithubApiSponsorship[],
      pageInfo: GithubApiPageInfo,
    },
  },
}>;
