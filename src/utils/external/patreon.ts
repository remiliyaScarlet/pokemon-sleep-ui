import {PatreonChargeStatus} from '@/types/patreon/common/enum';


export const isPatreonChargeSuccessful = (chargeStatus: PatreonChargeStatus) => {
  return chargeStatus === 'Paid';
};
