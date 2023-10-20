import {UserActivationProperties} from '@/types/mongo/activation';


export type PatreonUserActivationPayload = {
  email: string,
  activationProperties: UserActivationProperties | null,
};
