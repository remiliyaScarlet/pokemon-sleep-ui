import {Collection} from 'mongodb';

import {getDataAsArray} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {SnorlaxReward} from '@/types/game/snorlax';


const getCollection = async (): Promise<Collection<SnorlaxReward>> => {
  const client = await mongoPromise;

  return client
    .db('snorlax')
    .collection<SnorlaxReward>('reward');
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({rank: 1}, {unique: true}),
  ]);
};

export const getSnorlaxReward = async () => {
  return getDataAsArray(getCollection());
};

addIndex().catch((e) => console.error('MongoDB failed to initialize Snorlax reward index', e));
