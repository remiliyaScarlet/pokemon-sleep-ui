import {ActivationKey} from '@/types/mongo/activation';
import {PatreonMemberData} from '@/types/patreon/memberData';


export type PatreonUserScanOpts = {
  memberData: PatreonMemberData[],
  activations: ActivationKey[],
};

export type PatreonUserDeactivationPayload = {
  memberData: PatreonMemberData,
  key: string,
};

export type PatreonSubscriberScanResult = {
  toSendActivation: PatreonMemberData[],
  toUpdateExpiry: PatreonMemberData[],
  toDeactivate: PatreonUserDeactivationPayload[],
};
