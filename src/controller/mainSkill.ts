import {Collection} from 'mongodb';

import {getDataAsArray, getDataAsMap, getSingleData} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {MainSkillData, MainSkillId, MainSkillMap} from '@/types/game/pokemon/mainSkill';


const getCollection = async (): Promise<Collection<MainSkillData>> => {
  const client = await mongoPromise;

  return client
    .db('skill')
    .collection<MainSkillData>('main');
};

export const getAllMainSkillData = async (): Promise<MainSkillData[]> => (
  getDataAsArray(getCollection())
);

export const getMainSkillMap = async (): Promise<MainSkillMap> => (
  getDataAsMap(getCollection(), ({id}) => id)
);

export const getMainSkillData = async (id: MainSkillId) => (
  getSingleData(getCollection(), {id})
);

const addIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex({id: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize main skill index', e));
