import {toIsoDateString} from '@/utils/date';


export const generateInitialUserActivationPropertiesAtClient = () => {
  const expiry = new Date();

  expiry.setDate(expiry.getDate() + 183);

  return {
    expiry: toIsoDateString(expiry),
    activation: {
      adsFree: true,
      premium: true,
    },
    source: null,
    contact: {},
    isSpecial: false,
    note: '',
  };
};
