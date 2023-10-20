import {patreonSearchParams} from '@/handler/patreon/api/const';
import {PatreonMemberResponse} from '@/handler/patreon/api/member/type';


type GetPatreonMemberOpts = {
  userId: string,
};

export const getPatreonMember = async ({userId}: GetPatreonMemberOpts): Promise<PatreonMemberResponse> => {
  const response = await fetch(
    `https://www.patreon.com/api/oauth2/v2/members/${userId}?${patreonSearchParams.toString()}`,
    {
      headers: {
        authorization: `Bearer ${process.env.EXTERNAL_PATREON_OAUTH_ACCESS_TOKEN}`,
      },
    },
  );

  return await response.json() as PatreonMemberResponse;
};
