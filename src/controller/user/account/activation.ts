import {ObjectId} from 'bson';
import {Collection, MongoError} from 'mongodb';

import {getDataAsArray, getSingleData} from '@/controller/common';
import {getActivationKey, removeActivationKey} from '@/controller/user/account/activationKey';
import {throwIfNotAdmin} from '@/controller/user/account/common';
import {ControllerRequireAdminOpts} from '@/controller/user/account/type';
import mongoPromise from '@/lib/mongodb';
import {
  UserActivationData,
  UserActivationDataAtClient,
  UserActivationProperties,
  UserActivationStatus,
} from '@/types/mongo/activation';
import {toUserActivationDataAtClient} from '@/utils/user/activation';


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

  await removeActivationKey(activationKey.key);
  return true;
};

export const getUserActivation = async (userId: string): Promise<UserActivationStatus | null> => {
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

type UpdateUserActivationOpts = ControllerRequireAdminOpts & UserActivationProperties & {
  key: UserActivationData['key'],
};

export const updateUserActivation = async ({
  executorUserId,
  key,
  activation,
  expiry,
  source,
  contact,
  isSpecial,
  note,
}: UpdateUserActivationOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).updateOne(
    {key},
    // Explicit to avoid overwriting properties that shouldn't get overwritten
    {$set: {
      activation,
      expiry,
      source,
      contact,
      isSpecial,
      note,
    }},
  );
};

type DeleteUserActivationOpts = ControllerRequireAdminOpts & {
  key: UserActivationData['key'],
};

export const deleteUserActivation = async ({executorUserId, key}: DeleteUserActivationOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).deleteOne({key});
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({userId: 1, key: 1}, {unique: true}),
    collection.createIndex({expiry: 1}, {expireAfterSeconds: 0}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize user ads free data index', e));
