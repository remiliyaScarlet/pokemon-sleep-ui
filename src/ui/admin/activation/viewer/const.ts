import {ActivationSource} from '@/types/mongo/activation';
import {ActivationButtonTextGetter} from '@/ui/admin/activation/viewer/type';


export const activationButtonTextGetter: {[source in ActivationSource]: ActivationButtonTextGetter} = {
  discord: ({userId, contact}) => contact.discord ?? `(${userId})`,
  patreon: ({userId, contact}) => contact.discord ?? contact.patreon ?? `(${userId})`,
};
