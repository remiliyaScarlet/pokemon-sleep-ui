import {PatreonSocialConnections} from '@/types/patreon/common/patron/social/main';


// https://docs.patreon.com/#fetching-a-patron-39-s-profile-info
export type PatreonPatron = {
  type: 'user',
  id: string,
  attributes: {
    email: string,
    social_connections: PatreonSocialConnections,
  }
};
