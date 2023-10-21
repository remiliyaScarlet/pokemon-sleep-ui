import {ActivationKey} from '@/types/mongo/activation';
import {PatreonMemberData} from '@/types/patreon/memberData';


export type ScanPatronOpts = {
  memberData: PatreonMemberData[],
  activations: ActivationKey[],
};

export type ScanPatronResult = {
  toSendActivation: PatreonMemberData[],
  toUpdateExpiry: PatreonMemberData[],
  toDeactivate: string[],
};
