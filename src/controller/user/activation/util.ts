import {Filter} from 'mongodb';

import {removeActivationData, updateActivationPropertiesOfData} from '@/controller/user/activation/data';
import {removeActivationKey, updateActivationPropertiesOfKey} from '@/controller/user/activation/key';
import {UserActivationProperties} from '@/types/mongo/activation';


type UpdateActivationPropertiesOpts = {
  filter: Filter<UserActivationProperties>,
  properties: UserActivationProperties,
};

export const updateActivationProperties = ({filter, properties}: UpdateActivationPropertiesOpts) => {
  return Promise.all([
    updateActivationPropertiesOfData({executorUserId: process.env.NEXTAUTH_ADMIN_UID, filter, update: properties}),
    updateActivationPropertiesOfKey({filter, update: properties}),
  ]);
};

type RemoveActivationPropertiesOpts = {
  filter: Filter<UserActivationProperties>,
};

export const removeActivation = ({filter}: RemoveActivationPropertiesOpts) => {
  return Promise.all([
    removeActivationKey({filter}),
    removeActivationData({executorUserId: process.env.NEXTAUTH_ADMIN_UID, filter}),
  ]);
};
