import {durationOfDay} from '@/const/common';
import {ActivationDataAtClient, ActivationPropertiesAtClient} from '@/types/mongo/activation';
import {toIsoTimestampString} from '@/utils/date';
import {getActivationExpiryOfDefault} from '@/utils/user/activation/utils';


export const generateInitialActivationPropertiesAtClient = (): ActivationPropertiesAtClient => ({
  expiry: toIsoTimestampString(getActivationExpiryOfDefault()),
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
