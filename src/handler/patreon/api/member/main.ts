import {patreonSearchParams} from '@/handler/patreon/api/const';
import {PatreonMemberData} from '@/handler/patreon/api/member/type';


type GetPatreonMemberOpts = {
  userId: string,
};

export const getPatreonMemberData = async ({userId}: GetPatreonMemberOpts): Promise<PatreonMemberData> => {
  const response = await fetch(
    `https://www.patreon.com/api/oauth2/v2/members/${userId}?${patreonSearchParams.toString()}`,
    {
      headers: {
        authorization: `Bearer ${process.env.EXTERNAL_PATREON_OAUTH_ACCESS_TOKEN}`,
      },
    },
  );

  return await response.json() as PatreonMemberData;
};
