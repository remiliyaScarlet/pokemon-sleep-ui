import {ActivationProperties} from '@/types/mongo/activation';


export type PatreonActivationPayload = {
  email: string,
  activationProperties: ActivationProperties | null,
};
