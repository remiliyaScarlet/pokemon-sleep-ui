import {ActivationDataAtClient, UserIdToEmailMap} from '@/types/mongo/activation';


export type SiteAdminServerDataProps = {
  userIdEmailMap: UserIdToEmailMap,
  preloaded: {
    activations: ActivationDataAtClient[],
  },
};

