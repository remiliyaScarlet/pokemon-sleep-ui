import crypto from 'crypto';

import {Collection} from 'mongodb';

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

export const popActivationKey = async (key: string): Promise<UserActivationKey | null> => {
  const keyData = await (await getCollection()).findOneAndDelete({key});

  return keyData.value;
};

const addActivationKeyIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({key: 1}, {unique: true}),
    collection.createIndex({generatedAt: 1}, {expireAfterSeconds: 86400}),
  ]);
};

addActivationKeyIndex()
  .catch((e) => console.error('MongoDB failed to add user activation key index', e));
