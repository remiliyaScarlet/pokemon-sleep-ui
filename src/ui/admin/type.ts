import {ActivationDataAtClient} from '@/types/mongo/activation';
import {UserIdToEmailMap} from '@/types/mongo/auth';


export type SiteAdminServerDataProps = {
  userIdEmailMap: UserIdToEmailMap,
  preloaded: {
    activations: ActivationDataAtClient[],
  },
};

