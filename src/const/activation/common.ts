import {ActivationContact, ActivationSourceAll, ActivationType} from '@/types/mongo/activation';


export const activationSourceToText: {[source in ActivationSourceAll]: string} = {
  patreon: 'Patreon',
  discord: 'Discord',
  github: 'Github',
  adClick: '(Ad Click)',
};

export const activationContactToText: {[contact in ActivationContact]: string} = {
  ...activationSourceToText,
  line: 'LINE',
};

export const activationTypeToText: {[type in ActivationType]: string} = {
  adsFree: 'Ads-Free',
  premium: 'Premium',
};

export const adsFreeByAdsClickDuration = 60 * 60 * 1000; // 1 Hour
