import {ActivationProperties} from '@/types/mongo/activation';


export type ActionSendActivationPayload = {
  email: string,
  activationProperties: ActivationProperties | null,
};
