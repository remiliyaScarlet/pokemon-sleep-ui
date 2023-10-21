import {PatreonMember} from '@/types/patreon/common/member';


export const isPatronActive = ({attributes}: PatreonMember) => {
  const {last_charge_status: chargeStatus, patron_status: patronStatus} = attributes;

  return chargeStatus === 'Paid' && patronStatus === 'active_patron';
};
