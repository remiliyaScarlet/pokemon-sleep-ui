import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {SubSkillData, SubSkillMap} from '@/types/game/pokemon/subskill';


const getCollection = async (): Promise<Collection<SubSkillData>> => {
  const client = await mongoPromise;

  return client
    .db('skill')
    .collection<SubSkillData>('sub');
};

export const getAllSubSkillData = async () => (
  (await getCollection()).find({}, {projection: {_id: false}}).toArray()
);

export const getSubSkillMap = async () => {
  const ret: SubSkillMap = {};

  for await (const map of (await getCollection()).find({}, {projection: {_id: false}})) {
    ret[map.id] = map;
  }

  return ret;
};

const addSubSkillIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex({id: 1}, {unique: true}),
  ]);
};

addSubSkillIndex()
  .catch((e) => console.error('MongoDB failed to add sub skill index', e));
