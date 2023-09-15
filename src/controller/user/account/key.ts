import crypto from 'crypto';

import {Collection} from 'mongodb';

import {getSingleData} from '@/controller/common';
import {isAdmin} from '@/controller/user/account/common';
import mongoPromise from '@/lib/mongodb';
import {UserActivationKey} from '@/types/mongo/user';


const getCollection = async (): Promise<Collection<UserActivationKey>> => {
  const client = await mongoPromise;

  return client
    .db('auth')
    .collection<UserActivationKey>('activationKey');
};

export const generateActivationKey = async (executorUserId: string, expiry: string): Promise<string> => {
  if (!isAdmin(executorUserId)) {
    throw new Error('Attempted to generate user activation key without admin privilege!');
  }
  const key = crypto.randomBytes(24).toString('hex');
  await (await getCollection()).insertOne({
    key,
    expiry: new Date(expiry),
    generatedAt: new Date(),
  });

  return key;
};

export const getActivationKey = async (key: string) => (
  getSingleData(getCollection(), {key})
);

export const removeActivationKey = async (key: string) => (
  (await getCollection()).deleteOne({key})
);

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({key: 1}, {unique: true}),
    collection.createIndex({generatedAt: 1}, {expireAfterSeconds: 86400}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize user activation key index', e));
