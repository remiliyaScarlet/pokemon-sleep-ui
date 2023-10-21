import {uniqBy} from 'lodash';

import {PatreonSubscriberScanResult} from '@/handler/call/activation/poll/scan/type';


export const mergePatreonSubscriberScanResult = (
  ...results: PatreonSubscriberScanResult[]
): PatreonSubscriberScanResult => {
  return {
    toSendActivation: uniqBy(results.flatMap(({toSendActivation}) => toSendActivation), ({member}) => member.id),
    toUpdateExpiry: uniqBy(results.flatMap(({toUpdateExpiry}) => toUpdateExpiry), ({member}) => member.id),
    toDeactivate: uniqBy(results.flatMap(({toDeactivate}) => toDeactivate), ({key}) => key),
  };
};
