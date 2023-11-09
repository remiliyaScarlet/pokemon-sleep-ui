import {durationOfDay} from '@/const/common';
import {ActivationDataAtClient, ActivationPropertiesAtClient} from '@/types/mongo/activation';
import {toIsoDateString} from '@/utils/date';
import {getActivationExpiry} from '@/utils/user/activation/utils';


export const generateInitialActivationPropertiesAtClient = (): ActivationPropertiesAtClient => ({
  expiry: toIsoDateString(getActivationExpiry()),
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

export const isExpiringSoon = ({data, now}: IsExpiringSoonOpts) => {
  return new Date(data.expiry).getTime() - now.getTime() < durationOfDay * 3 * 1000;
};
