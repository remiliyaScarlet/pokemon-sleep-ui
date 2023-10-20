import crypto from 'crypto';

import {Collection, Filter} from 'mongodb';

import {durationOfDay} from '@/const/common';
import {getSingleData} from '@/controller/common';
import {throwIfNotAdmin} from '@/controller/user/account/common';
import {ControllerRequireAdminOpts} from '@/controller/user/account/type';
import mongoPromise from '@/lib/mongodb';
import {activationContact, ActivationKey, ActivationProperties} from '@/types/mongo/activation';


const getCollection = async (): Promise<Collection<ActivationKey>> => {
  const client = await mongoPromise;

  return client
    .db('auth')
    .collection<ActivationKey>('activationKey');
};

type GenerateActivationKeyOpts = ControllerRequireAdminOpts & ActivationProperties;

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

type GetActivationKeyByFilterOpts = ControllerRequireAdminOpts & {
  filter: Filter<ActivationKey>,
};

export const getActivationKeyByFilter = ({executorUserId, filter}: GetActivationKeyByFilterOpts) => {
  throwIfNotAdmin(executorUserId);

  return getSingleData(getCollection(), filter);
};

export const getActivationKey = async (key: string) => (
  getSingleData(getCollection(), {key})
);

type UpdateActivationPropertiesOfKeyOpts = {
  filter: Filter<ActivationKey>,
  update: ActivationProperties,
};

export const updateActivationKeyProperties = async ({filter, update}: UpdateActivationPropertiesOfKeyOpts) => {
  return (await getCollection()).updateOne(filter, {$set: update});
};

type RemoveActivationKeyOpts = {
  filter: Filter<ActivationKey>,
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
    ...activationContact.map((channel) => (
      collection.createIndex({[`contact.${channel}`]: 1}, {unique: true, sparse: true})
    )),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize user activation key index', e));
