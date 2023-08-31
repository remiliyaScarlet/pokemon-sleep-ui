import {ObjectId} from 'bson';
import {Collection, MongoError} from 'mongodb';

import {getActivationKey, removeActivationKey} from '@/controller/user/account/key';
import mongoPromise from '@/lib/mongodb';
import {UserAdsFreeData} from '@/types/mongo/user';


const getCollection = async (): Promise<Collection<UserAdsFreeData>> => {
  const client = await mongoPromise;

  return client
    .db('auth')
    .collection<UserAdsFreeData>('adsFree');
};

export const activateAdsFree = async (userId: string, key: string): Promise<boolean> => {
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

export const isUserAdsFree = async (userId: string): Promise<boolean> => {
  return !!await (await getCollection()).findOne({userId: new ObjectId(userId)});
};

const addAdsFreeDataIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({userId: 1}, {unique: true}),
    collection.createIndex({expiry: 1}, {expireAfterSeconds: 0}),
  ]);
};

addAdsFreeDataIndex()
  .catch((e) => console.error('MongoDB failed to initialize user ads free data index', e));
