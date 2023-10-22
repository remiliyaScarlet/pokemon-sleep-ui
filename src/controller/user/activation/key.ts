import crypto from 'crypto';

import {Collection, Filter, UpdateOneModel} from 'mongodb';

import {durationOfDay} from '@/const/common';
import {getDataAsArray, getSingleData} from '@/controller/common';
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
  const {contact} = opts;

  if (await collection.findOne({contact})) {
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

type GetAllActivationKeysOpts = ControllerRequireAdminOpts & {
  filter: Filter<ActivationKey>,
};

export const getAllActivationKeys = ({executorUserId, filter}: GetAllActivationKeysOpts) => {
  throwIfNotAdmin(executorUserId);

  return getDataAsArray(getCollection(), filter);
};

export const getActivationKeyByFilter = ({executorUserId, filter}: GetActivationKeyByFilterOpts) => {
  throwIfNotAdmin(executorUserId);

  return getSingleData(getCollection(), filter);
};

export const getActivationKey = async (key: string) => (
  getSingleData(getCollection(), {key})
);

type UpdateActivationPropertiesOfKeyOpts = ControllerRequireAdminOpts & {
  filter: Filter<ActivationKey>,
  update: ActivationProperties,
};

export const updateActivationKeyPropertiesSingle = async ({
  executorUserId,
  filter,
  update,
}: UpdateActivationPropertiesOfKeyOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).updateOne(filter, {$set: update});
};

type UpdateActivationKeyPropertiesBatchOpts = ControllerRequireAdminOpts & {
  updates: UpdateOneModel<ActivationKey>[]
};

export const updateActivationKeyPropertiesBatch = async ({
  executorUserId,
  updates,
}: UpdateActivationKeyPropertiesBatchOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).bulkWrite(
    updates.map((updateOne) => ({updateOne})),
    {ordered: false},
  );
};

type RemoveActivationKeyOpts = ControllerRequireAdminOpts & {
  filter: Filter<ActivationKey>,
};

export const removeActivationKeySingle = async ({executorUserId, filter}: RemoveActivationKeyOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).deleteOne(filter);
};

export const removeActivationKeyBatch = async ({executorUserId, filter}: RemoveActivationKeyOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).deleteMany(filter);
};

export const removeActivationKeyByKey = async (key: string) => (
  removeActivationKeySingle({executorUserId: process.env.NEXTAUTH_ADMIN_UID, filter: {key}})
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
