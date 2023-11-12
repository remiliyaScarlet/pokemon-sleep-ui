import {ObjectId} from 'bson';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {IsoDateString} from '@/types/date';


export type UserDataInDatabase<T> = {
  userId: string,
  data: T,
};

export const activationType = [
  'adsFree',
  'premium',
] as const;

export type ActivationType = typeof activationType[number];

export const activationSource = [
  'discord',
  'patreon',
  'github',
] as const;

export type ActivationSource = typeof activationSource[number];

export const activationContact = [
  ...activationSource,
  'line',
] as const;

export type ActivationContact = typeof activationContact[number];

export type ActivationStatus = FilterInclusionMap<ActivationType>;

export type ActivationProperties = {
  expiry: Date,
  source: ActivationSource | null,
  contact: {[contact in ActivationContact]?: string | null},
  isSpecial: boolean,
  isCmsMod?: boolean,
  isActivationLocked?: boolean,
  note: string,
  activation: ActivationStatus,
};

export type ActivationPropertiesAtClient = Omit<ActivationProperties, 'expiry'> & {
  expiry: IsoDateString,
};

export type ActivationKey = ActivationProperties & {
  key: string,
  generatedAt: Date,
};

export type ActivationKeyAtClient =
  ActivationPropertiesAtClient &
  Omit<ActivationKey, keyof ActivationProperties | 'generatedAt'> & {
    generatedAt: IsoDateString,
  };

export type ActivationData = ActivationKey & {
  userId: ObjectId,
};

export type ActivationDataAtClient =
  ActivationKeyAtClient &
  Omit<ActivationData, keyof ActivationKey | 'userId'> & {
    userId: string,
  };

export type ActivationInfo = {
  type: 'key',
  data: ActivationKeyAtClient,
} | {
  type: 'data',
  data: ActivationDataAtClient,
};
