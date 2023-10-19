import {UserActivationDataAtClient, UserIdToEmailMap} from '@/types/mongo/activation';


export type SiteAdminDataProps = {
  activations: UserActivationDataAtClient[],
  userIdEmailMap: UserIdToEmailMap,
};
