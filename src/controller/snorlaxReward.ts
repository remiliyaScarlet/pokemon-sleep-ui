import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {SnorlaxReward} from '@/types/mongo/snorlax';


const getCollection = async (): Promise<Collection<SnorlaxReward>> => {
  const client = await mongoPromise;

  return client
    .db('snorlax')
    .collection<SnorlaxReward>('reward');
};

const addSnorlaxRewardIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({rank: 1}, {unique: true}),
  ]);
};

export const getSnorlaxReward = async () => (
  (await getCollection()).find({}, {projection: {_id: false}}).toArray()
);

addSnorlaxRewardIndex()
  .catch((e) => console.error('MongoDB failed to add Snorlax reward index', e));
