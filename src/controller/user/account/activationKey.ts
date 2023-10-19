import crypto from 'crypto';

import {Collection} from 'mongodb';

import {durationOfDay} from '@/const/common';
import {getSingleData} from '@/controller/common';
import {throwIfNotAdmin} from '@/controller/user/account/common';
import {ControllerRequireAdminOpts} from '@/controller/user/account/type';
import mongoPromise from '@/lib/mongodb';
import {UserActivationKey, UserActivationProperties} from '@/types/mongo/activation';


const getCollection = async (): Promise<Collection<UserActivationKey>> => {
  const client = await mongoPromise;

  return client
    .db('auth')
    .collection<UserActivationKey>('activationKey');
};

type GenerateActivationKeyOpts = ControllerRequireAdminOpts & UserActivationProperties;

export const generateActivationKey = async ({executorUserId, ...opts}: GenerateActivationKeyOpts): Promise<string> => {
  throwIfNotAdmin(executorUserId);

  const key = crypto.randomBytes(24).toString('hex');
  await (await getCollection()).insertOne({
    ...opts,
    key,
    generatedAt: new Date(),
  });

  return `${process.env.NEXTAUTH_URL}/account/activate?key=${key}`;
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
    collection.createIndex({generatedAt: 1}, {expireAfterSeconds: durationOfDay}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize user activation key index', e));
