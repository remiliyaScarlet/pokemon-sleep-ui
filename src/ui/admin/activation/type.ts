import {UserActivationData} from '@/types/mongo/user';


export type UserActivationDataAtClient = Omit<UserActivationData, 'userId'> & {
  userId: string,
};
