import {UserActivationContact, UserActivationType} from '@/types/mongo/activation';


export const userActivationContactToText: {[contact in UserActivationContact]: string} = {
  patreon: 'Patreon',
  discord: 'Discord',
  line: 'LINE',
};

export const userActivationTypeToText: {[type in UserActivationType]: string} = {
  adsFree: 'Ads-Free',
  premium: 'Premium',
};
