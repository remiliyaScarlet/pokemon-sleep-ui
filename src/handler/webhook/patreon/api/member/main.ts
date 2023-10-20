import {PatreonMemberData} from '@/handler/webhook/patreon/api/member/type';


type GetPatreonMemberOpts = {
  userId: string,
};

export const getPatreonMemberData = async ({userId}: GetPatreonMemberOpts): Promise<PatreonMemberData> => {
  const params = new URLSearchParams();
  params.append('include', 'user');
  // This determines what data to return,
  // therefore the keys requested here must match the type of `PatreonMember.attributes`
  params.append('fields[member]', 'email,last_charge_date,last_charge_status,patron_status,pledge_cadence');
  // This determines what data to return,
  // therefore the keys requested here must match the type of `PatreonUser.attributes`
  params.append('fields[user]', 'social_connections');

  const response = await fetch(
    `https://www.patreon.com/api/oauth2/v2/members/${userId}?${params.toString()}`,
    {
      headers: {
        authorization: `Bearer ${process.env.EXTERNAL_PATREON_OAUTH_ACCESS_TOKEN}`,
      },
    },
  );

  return await response.json() as PatreonMemberData;
};
