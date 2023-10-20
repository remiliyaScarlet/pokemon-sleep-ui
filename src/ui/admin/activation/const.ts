import {ActivationContact, ActivationType} from '@/types/mongo/activation';


export const activationContactToText: {[contact in ActivationContact]: string} = {
  patreon: 'Patreon',
  discord: 'Discord',
  line: 'LINE',
};

export const activationTypeToText: {[type in ActivationType]: string} = {
  adsFree: 'Ads-Free',
  premium: 'Premium',
};
