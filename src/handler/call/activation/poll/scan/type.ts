import {ActivationKey} from '@/types/mongo/activation';
import {PatreonMemberData} from '@/types/patreon/memberData';


export type ScanPatronOpts = {
  memberData: PatreonMemberData[],
  activations: ActivationKey[],
};

export type ScanPatronDeactivationPayload = {
  memberData: PatreonMemberData,
  key: string,
};

export type ScanPatronResult = {
  toSendActivation: PatreonMemberData[],
  toUpdateExpiry: PatreonMemberData[],
  toDeactivate: ScanPatronDeactivationPayload[],
};
