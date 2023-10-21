import {ScanPatronOpts, ScanPatronResult} from '@/handler/call/activation/poll/scan/type';
import {isPatronActive} from '@/utils/external/patreon';


export const scanActivations = ({memberData, activations}: ScanPatronOpts): ScanPatronResult => {
  const result: ScanPatronResult = {
    toUpdateExpiry: [],
    toDeactivate: [],
    toSendActivation: [],
  };

  for (const {key, source, contact} of activations) {
    if (source !== 'patreon') {
      continue;
    }

    const patreonMemberData = memberData
      .find(({member}) => member.attributes.email === contact.patreon);
    if (!patreonMemberData) {
      continue;
    }

    if (isPatronActive(patreonMemberData.member)) {
      continue;
    }

    result.toDeactivate.push(key);
  }

  return result;
};
