import {UserActivationDataAtClient, UserIdToEmailMap} from '@/types/mongo/activation';


export type SiteAdminServerDataProps = {
  userIdEmailMap: UserIdToEmailMap,
  preloaded: {
    activations: UserActivationDataAtClient[],
  },
};

