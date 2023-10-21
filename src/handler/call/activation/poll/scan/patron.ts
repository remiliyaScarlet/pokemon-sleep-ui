import {ScanPatronOpts, ScanPatronResult} from '@/handler/call/activation/poll/scan/type';
import {isPatreonChargeSuccessful} from '@/utils/external/patreon';


export const scanPatron = ({memberData, activations}: ScanPatronOpts): ScanPatronResult => {
  const result: ScanPatronResult = {
    toUpdateExpiry: [],
    toDeactivate: [],
    toSendActivation: [],
  };

  for (const data of memberData) {
    const {member} = data;
    const activation = activations
      .find(({contact}) => contact.patreon === member.attributes.email);

    if (!!activation) {
      if (isPatreonChargeSuccessful(data.member.attributes.last_charge_status)) {
        result.toUpdateExpiry.push(data);
      } else {
        result.toDeactivate.push(activation.key);
      }
    } else {
      result.toSendActivation.push(data);
    }
  }

  return result;
};
