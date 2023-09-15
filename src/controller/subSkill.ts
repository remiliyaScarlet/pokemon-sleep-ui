import {Collection} from 'mongodb';

import {getDataAsArray, getDataAsMap} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {SubSkillData} from '@/types/game/pokemon/subSkill';


const getCollection = async (): Promise<Collection<SubSkillData>> => {
  const client = await mongoPromise;

  return client
    .db('skill')
    .collection<SubSkillData>('sub');
};

export const getAllSubSkillData = async () => {
  return getDataAsArray(getCollection());
};

export const getSubSkillMap = async () => {
  return getDataAsMap(getCollection(), ({id}) => id);
};

const addIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex({id: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize sub skill index', e));
