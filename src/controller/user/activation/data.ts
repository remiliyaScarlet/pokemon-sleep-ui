import {ObjectId} from 'bson';
import {Collection, Filter, MongoError} from 'mongodb';

import {getDataAsArray, getSingleData} from '@/controller/common';
import {throwIfNotAdmin} from '@/controller/user/account/common';
import {ControllerRequireAdminOpts} from '@/controller/user/account/type';
import {getActivationKey, removeActivationKeyByKey} from '@/controller/user/activation/key';
import mongoPromise from '@/lib/mongodb';
import {
  userActivationContact,
  UserActivationData,
  UserActivationDataAtClient,
  UserActivationKey,
  UserActivationProperties,
  UserActivationStatus,
} from '@/types/mongo/activation';
import {toUserActivationDataAtClient} from '@/utils/user/activation/utils';


const getCollection = async (): Promise<Collection<UserActivationData>> => {
  const client = await mongoPromise;

  return client
    .db('auth')
    .collection<UserActivationData>('activation');
};

export const userActivateKey = async (userId: string, key: string): Promise<boolean> => {
  const activationKey = await getActivationKey(key);

  if (!activationKey) {
    return false;
  }

  try {
    await (await getCollection()).insertOne({userId: new ObjectId(userId), ...activationKey});
  } catch (e) {
    if (e instanceof MongoError) {
      return false;
    }

    throw e;
  }

  await removeActivationKeyByKey(activationKey.key);
  return true;
};

type GetActivationDataByFilterOpts = ControllerRequireAdminOpts & {
  filter: Filter<UserActivationData>,
};

export const getActivationDataByFilter = ({executorUserId, filter}: GetActivationDataByFilterOpts) => {
  throwIfNotAdmin(executorUserId);

  return getSingleData(getCollection(), filter);
};

export const getActivationData = async (userId: string): Promise<UserActivationStatus | null> => {
  const data = await getSingleData(getCollection(), {userId: new ObjectId(userId)});

  if (!data) {
    return null;
  }

  return data.activation;
};

export const getAllActivationsAsClient = async (): Promise<UserActivationDataAtClient[]> => {
  return (await getDataAsArray(getCollection())).map(toUserActivationDataAtClient);
};

export const getPaidUserCount = async () => (await getCollection()).countDocuments({source: {$ne: null}});

type UpdateActivationPropertiesOfDataOpts = ControllerRequireAdminOpts & {
  filter: Filter<UserActivationData>,
  update: UserActivationProperties,
};

export const updateActivationPropertiesOfData = async ({
  executorUserId,
  filter,
  update,
}: UpdateActivationPropertiesOfDataOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).updateOne(filter, {$set: update});
};

type UpdateUserActivationByKeyOpts = ControllerRequireAdminOpts & UserActivationProperties & {
  key: UserActivationData['key'],
};

export const updateUserActivationByKey = async ({
  executorUserId,
  key,
  activation,
  expiry,
  source,
  contact,
  isSpecial,
  note,
}: UpdateUserActivationByKeyOpts) => updateActivationPropertiesOfData({
  executorUserId,
  filter: {key},
  update: {
    activation,
    expiry,
    source,
    contact,
    isSpecial,
    note,
  },
});

type RemoveUserActivationDataOpts = ControllerRequireAdminOpts & {
  filter: Filter<UserActivationKey>,
};

export const removeActivationData = async ({executorUserId, filter}: RemoveUserActivationDataOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).deleteOne(filter);
};

type RemoveActivationDataByKeyOpts = ControllerRequireAdminOpts & {
  key: UserActivationData['key'],
};

export const removeActivationDataByKey = ({executorUserId, key}: RemoveActivationDataByKeyOpts) => (
  removeActivationData({executorUserId, filter: {key}})
);

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({userId: 1, key: 1}, {unique: true}),
    collection.createIndex({expiry: 1}, {expireAfterSeconds: 0}),
    ...userActivationContact.map((channel) => (
      collection.createIndex({[`contact.${channel}`]: 1}, {unique: true, sparse: true})
    )),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize user ads free data index', e));
