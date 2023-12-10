import {ActivationSource} from '@/types/mongo/activation';
import {ActivationButtonTextGetter} from '@/ui/admin/activation/viewer/type';


export const activationButtonTextGetter: {[source in ActivationSource]: ActivationButtonTextGetter} = {
  discord: ({contact}) => (
    contact.discord
  ),
  patreon: ({contact}) => (
    contact.discord ?? contact.patreon
  ),
  github: ({contact}) => (
    `@${contact.github}` ?? contact.discord
  ),
};
