import {zip} from 'lodash';

import {PatreonCampaignMemberResponse} from '@/handler/patreon/api/campaign/type';
import {patreonSearchParams} from '@/handler/patreon/api/const';
import {sendPatreonApiRequest} from '@/handler/patreon/api/utils';
import {PatreonMember} from '@/types/patreon/common/member';
import {PatreonUser} from '@/types/patreon/common/user';
import {PatreonMemberData} from '@/types/patreon/memberData';
import {isNotNullish} from '@/utils/type';


export const getCurrentCampaignMembers = async (): Promise<PatreonMemberData[]> => {
  const campaign = process.env.EXTERNAL_PATREON_CAMPAIGN_ID;

  const members: PatreonMember[] = [];
  const users: PatreonUser[] = [];

  let url: string | undefined = (
    `https://www.patreon.com/api/oauth2/v2/campaigns/${campaign}/members?${patreonSearchParams.toString()}`
  );
  do {
    const response = await sendPatreonApiRequest(url);
    const {data, included, links} = await response.json() as PatreonCampaignMemberResponse;

    members.push(...data);
    users.push(...included);

    url = links?.next;
  } while (!!url);

  return zip(members, users)
    .map(([member, user]) => {
      if (!member) {
        return null;
      }

      if (!user) {
        return null;
      }

      return {member, user};
    })
    .filter(isNotNullish);
};
