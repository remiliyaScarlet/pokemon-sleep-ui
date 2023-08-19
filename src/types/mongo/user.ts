import {ObjectId} from 'bson';


export type UserDataInDatabase<T> = {
  userId: string,
  data: T,
};

export type UserActivationKey = {
  key: string,
  expiry: Date,
  generatedAt: Date,
};

export type UserAdsFreeData = UserActivationKey & {
  userId: ObjectId,
};
