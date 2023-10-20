import {Filter} from 'mongodb';

import {
  getActivationDataByFilter,
  removeActivationData,
  updateActivationDataProperties,
} from '@/controller/user/activation/data';
import {
  getActivationKeyByFilter,
  removeActivationKey,
  updateActivationKeyProperties,
} from '@/controller/user/activation/key';
import {ActivationContact, ActivationProperties} from '@/types/mongo/activation';


type UpdateActivationPropertiesOpts = {
  filter: Filter<ActivationProperties>,
  properties: ActivationProperties,
};

export const updateActivationProperties = ({filter, properties}: UpdateActivationPropertiesOpts) => {
  return Promise.all([
    updateActivationDataProperties({executorUserId: process.env.NEXTAUTH_ADMIN_UID, filter, update: properties}),
    updateActivationKeyProperties({filter, update: properties}),
  ]);
};

type RemoveActivationPropertiesOpts = {
  filter: Filter<ActivationProperties>,
};

export const removeActivation = ({filter}: RemoveActivationPropertiesOpts) => {
  return Promise.all([
    removeActivationKey({filter}),
    removeActivationData({executorUserId: process.env.NEXTAUTH_ADMIN_UID, filter}),
  ]);
};

export const getActivationPropertiesByPatreonContact = async (
  contact: string,
): Promise<ActivationProperties | null> => {
  const filter: Filter<ActivationProperties> = {[`contact.${'patreon' satisfies ActivationContact}`]: contact};

  const properties = await getActivationDataByFilter({
    executorUserId: process.env.NEXTAUTH_ADMIN_UID,
    filter,
  });
  if (properties) {
    return properties;
  }

  return await getActivationKeyByFilter({executorUserId: process.env.NEXTAUTH_ADMIN_UID, filter});
};
