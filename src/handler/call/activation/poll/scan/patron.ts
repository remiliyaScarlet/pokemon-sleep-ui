import {PatreonUserScanOpts, PatreonSubscriberScanResult} from '@/handler/call/activation/poll/scan/type';
import {isPatronActive} from '@/utils/external/patreon';


export const scanPatron = ({memberData, activations}: PatreonUserScanOpts): PatreonSubscriberScanResult => {
  const result: PatreonSubscriberScanResult = {
    toUpdateExpiry: [],
    toDeactivate: [],
    toSendActivation: [],
  };

  for (const data of memberData) {
    const {member} = data;
    const activation = activations.find(({source, contact}) => (
      source === 'patreon' && contact.patreon === member.attributes.email
    ));

    if (isPatronActive(data.member)) {
      if (!activation) {
        result.toSendActivation.push(data);
      } else {
        result.toUpdateExpiry.push(data);
      }
    } else if (activation) {
      result.toDeactivate.push({memberData: data, key: activation.key});
    }
  }

  return result;
};
