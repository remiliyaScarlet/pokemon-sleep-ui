import {UserActivationData, UserIdToEmailMap} from '@/types/mongo/user';


export type SiteAdminDataProps = {
  activations: SiteAdminUserActivationData[],
  userMap: UserIdToEmailMap,
};

export type SiteAdminUserActivationData = Omit<UserActivationData, 'userId'> & {
  userId: string,
};
