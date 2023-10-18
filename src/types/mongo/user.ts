import {ObjectId} from 'bson';

import {FilterInclusionMap} from '@/components/input/filter/type';


export type UserDataInDatabase<T> = {
  userId: string,
  data: T,
};

export const userActivationType = [
  'adsFree',
  'premium',
] as const;

export type UserActivationType = typeof userActivationType[number];

export const userActivationSource = [
  'discord',
  'patreon',
] as const;

export type UserActivationSource = typeof userActivationSource[number];

export const userActivationContact = [
  ...userActivationSource,
  'line',
] as const;

export type UserActivationContact = typeof userActivationContact[number];

export type UserActivationProperties = {
  expiry: Date,
  source: UserActivationSource | null,
  contact: {[contact in UserActivationContact]: string | null},
  isSpecial: boolean,
  note: string,
  activation: FilterInclusionMap<UserActivationType>,
};

export type UserActivationKey = UserActivationProperties & {
  key: string,
  generatedAt: Date,
};

export type UserAdsFreeData = UserActivationKey & {
  userId: ObjectId,
};
