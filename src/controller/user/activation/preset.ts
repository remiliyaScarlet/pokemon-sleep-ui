import {Collection} from 'mongodb';

import {getDataAsMap, getSingleData} from '@/controller/common';
import {throwIfNotAdmin} from '@/controller/user/account/common';
import {ControllerRequireUserIdOpts} from '@/controller/user/account/type';
import mongoPromise from '@/lib/mongodb';
import {ActivationSource} from '@/types/mongo/activation';
import {ActivationPresetData, ActivationPresetLookup, ActivationPresetMap} from '@/types/mongo/activationPreset';


const getCollection = async (): Promise<Collection<ActivationPresetData>> => {
  const client = await mongoPromise;

  return client
    .db('auth')
    .collection<ActivationPresetData>('activationPreset');
};

export const getActivationPresetMap = (): Promise<ActivationPresetMap> => (
  getDataAsMap(getCollection(), ({uuid}) => uuid)
);

export const getActivationPresetLookupOfSource = (source: ActivationSource): Promise<ActivationPresetLookup> => (
  getDataAsMap(getCollection(), ({tag}) => tag, {source})
);

type GetActivationPresetSingleOpts = {
  source: ActivationSource,
  tags: string[],
};

export const getActivationPresetSingle = ({source, tags}: GetActivationPresetSingleOpts) => {
  return getSingleData(getCollection(), {source, tag: {$in: tags}});
};

type UpdateActivationPresetsOpts = ControllerRequireUserIdOpts & {
  data: ActivationPresetMap,
};

export const updateActivationPresets = async ({executorUserId, data}: UpdateActivationPresetsOpts) => {
  throwIfNotAdmin(executorUserId);

  const collection = await getCollection();

  await collection.deleteMany();
  await collection.insertMany(Object.values(data));
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({uuid: 1}, {unique: true}),
    collection.createIndex({source: 1}),
    collection.createIndex({source: 1, tag: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize user activation preset index', e));
