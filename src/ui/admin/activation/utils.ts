import {durationOfDay} from '@/const/common';
import {ActivationDataAtClient, ActivationPropertiesAtClient} from '@/types/mongo/activation';
import {toIsoDateString} from '@/utils/date';
import {getActivationExpiryFromPatreon} from '@/utils/user/activation/utils';


export const generateInitialActivationPropertiesAtClient = (): ActivationPropertiesAtClient => ({
  expiry: toIsoDateString(getActivationExpiryFromPatreon()),
  activation: {
    adsFree: true,
    premium: true,
  },
  source: null,
  contact: {},
  isSpecial: false,
  note: '',
});

type IsExpiringSoonOpts = {
  data: ActivationDataAtClient,
  now: Date,
};

export const isExpiringSoon = ({data, now}: IsExpiringSoonOpts): boolean => {
  if (data.source === 'adClick') {
    return false;
  }

  return new Date(data.expiry).getTime() - now.getTime() < durationOfDay * 3 * 1000;
};
