import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {SubSkillData} from '@/types/game/pokemon/subskill';


const getCollection = async (): Promise<Collection<SubSkillData>> => {
  const client = await mongoPromise;

  return client
    .db('skill')
    .collection<SubSkillData>('sub');
};

export const getAllSubSkillData = async () => (
  (await getCollection()).find({}, {projection: {_id: false}}).toArray()
);

const addSubSkillIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex({id: 1}, {unique: true}),
  ]);
};

addSubSkillIndex()
  .catch((e) => console.error('MongoDB failed to add sub skill index', e));
