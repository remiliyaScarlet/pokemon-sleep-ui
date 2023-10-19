import {durationOfDay} from '@/const/common';
import {UserActivationDataAtClient} from '@/types/mongo/activation';
import {toIsoDateString} from '@/utils/date';
import {getActivationExpiry} from '@/utils/user/activation/utils';


export const generateInitialUserActivationPropertiesAtClient = () => ({
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
  data: UserActivationDataAtClient,
  now: Date,
};

export const isExpiringSoon = ({data, now}: IsExpiringSoonOpts) => {
  return new Date(data.expiry).getTime() - now.getTime() < durationOfDay * 7 * 1000;
};
