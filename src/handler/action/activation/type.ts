import {ActivationProperties} from '@/types/mongo/activation';


export type ActionSendActivationPayload = {
  contact: string,
  activationProperties: ActivationProperties | null,
};
