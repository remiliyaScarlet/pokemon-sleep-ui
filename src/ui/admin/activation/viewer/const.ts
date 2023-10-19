import {UserActivationSource} from '@/types/mongo/user';
import {UserActivationButtonTextGetter} from '@/ui/admin/activation/viewer/type';


export const userActivationButtonTextGetter: {[source in UserActivationSource]: UserActivationButtonTextGetter} = {
  discord: ({userId, contact}) => contact.discord ?? `(${userId})`,
  patreon: ({userId, contact}) => contact.discord ?? contact.patreon ?? `(${userId})`,
};
