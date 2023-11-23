import {ActivationContact, ActivationSource, ActivationType} from '@/types/mongo/activation';


export const activationSourceToText: {[source in ActivationSource]: string} = {
  patreon: 'Patreon',
  discord: 'Discord',
  github: 'Github',
};

export const activationContactToText: {[contact in ActivationContact]: string} = {
  ...activationSourceToText,
  line: 'LINE',
};

export const activationTypeToText: {[type in ActivationType]: string} = {
  adsFree: 'Ads-Free',
  premium: 'Premium',
};
