import {Filter} from 'mongodb';

import {
  getActivationDataByFilter,
  removeActivationData,
  updateActivationPropertiesOfData,
} from '@/controller/user/activation/data';
import {
  getActivationKeyByFilter,
  removeActivationKey,
  updateActivationPropertiesOfKey,
} from '@/controller/user/activation/key';
import {UserActivationContact, UserActivationProperties} from '@/types/mongo/activation';


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

export const getActivationPropertiesByPatreonContact = async (
  contact: string,
): Promise<UserActivationProperties | null> => {
  const filter: Filter<UserActivationProperties> = {[`contact.${'patreon' satisfies UserActivationContact}`]: contact};

  const properties = await getActivationDataByFilter({
    executorUserId: process.env.NEXTAUTH_ADMIN_UID,
    filter,
  });
  if (properties) {
    return properties;
  }

  return await getActivationKeyByFilter({executorUserId: process.env.NEXTAUTH_ADMIN_UID, filter});
};
