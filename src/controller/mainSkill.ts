import {Collection} from 'mongodb';

import {getDataAsArray, getSingleData} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {MainSkillData, MainSkillId} from '@/types/game/pokemon/mainSkill';


const getCollection = async (): Promise<Collection<MainSkillData>> => {
  const client = await mongoPromise;

  return client
    .db('skill')
    .collection<MainSkillData>('main');
};

export const getAllMainSkillData = async () => {
  return getDataAsArray(getCollection());
};

export const getMainSkillData = async (id: MainSkillId) => (
  getSingleData(getCollection(), {id})
);

const addMainSkillIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex({id: 1}, {unique: true}),
  ]);
};

addMainSkillIndex()
  .catch((e) => console.error('MongoDB failed to initialize main skill index', e));
