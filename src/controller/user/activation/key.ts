import crypto from 'crypto';

import {Collection, Filter} from 'mongodb';

import {durationOfDay} from '@/const/common';
import {getSingleData} from '@/controller/common';
import {throwIfNotAdmin} from '@/controller/user/account/common';
import {ControllerRequireAdminOpts} from '@/controller/user/account/type';
import mongoPromise from '@/lib/mongodb';
import {userActivationContact, UserActivationKey, UserActivationProperties} from '@/types/mongo/activation';


const getCollection = async (): Promise<Collection<UserActivationKey>> => {
  const client = await mongoPromise;

  return client
    .db('auth')
    .collection<UserActivationKey>('activationKey');
};

type GenerateActivationKeyOpts = ControllerRequireAdminOpts & UserActivationProperties;

export const generateActivationKey = async ({
  executorUserId,
  ...opts
}: GenerateActivationKeyOpts): Promise<string | null> => {
  throwIfNotAdmin(executorUserId);

  const collection = await getCollection();
  const {source} = opts;

  if (await collection.findOne({source})) {
    return null;
  }

  const key = crypto.randomBytes(24).toString('hex');
  await collection.insertOne({
    ...opts,
    key,
    generatedAt: new Date(),
  });

  return `${process.env.NEXTAUTH_URL}/account/activate?key=${key}`;
};

export const getActivationKey = async (key: string) => (
  getSingleData(getCollection(), {key})
);

type UpdateActivationPropertiesOfKeyOpts = {
  filter: Filter<UserActivationKey>,
  update: UserActivationProperties,
};

export const updateActivationPropertiesOfKey = async ({filter, update}: UpdateActivationPropertiesOfKeyOpts) => {
  return (await getCollection()).updateOne(filter, {$set: update});
};

type RemoveActivationKeyOpts = {
  filter: Filter<UserActivationKey>,
};

export const removeActivationKey = async ({filter}: RemoveActivationKeyOpts) => {
  return (await getCollection()).deleteOne(filter);
};

export const removeActivationKeyByKey = async (key: string) => (
  removeActivationKey({filter: {key}})
);

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({key: 1}, {unique: true}),
    collection.createIndex({generatedAt: 1}, {expireAfterSeconds: durationOfDay}),
    ...userActivationContact.map((channel) => (
      collection.createIndex({[`contact.${channel}`]: 1}, {unique: true, sparse: true})
    )),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize user activation key index', e));
