import {UserIdToEmailMap} from '@/types/mongo/user';
import {UserActivationDataAtClient} from '@/ui/admin/activation/type';


export type SiteAdminDataProps = {
  activations: UserActivationDataAtClient[],
  userIdEmailMap: UserIdToEmailMap,
};
