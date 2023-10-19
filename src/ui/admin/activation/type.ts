import {UserActivationData} from '@/types/mongo/user';


export type UserActivationDataAtClient = Omit<UserActivationData, 'userId' | 'expiry'> & {
  expiry: string,
  userId: string,
};
