import {ActivationProperties} from '@/types/mongo/activation';


export type ActionSendActivationEmailPayload = {
  email: string,
  activationProperties: ActivationProperties | null,
};
