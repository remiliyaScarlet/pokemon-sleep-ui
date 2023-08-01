import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {SnorlaxRankInMap} from '@/types/mongo/snorlax';


const getCollection = async (): Promise<Collection<SnorlaxRankInMap>> => {
  const client = await mongoPromise;

  return client
    .db('snorlax')
    .collection<SnorlaxRankInMap>('rank');
};

export const getSnorlaxRank = async () => (
  (await getCollection()).find({}, {projection: {_id: false}}).toArray()
);

const addSnorlaxRankIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({mapId: 1}, {unique: true}),
  ]);
};

addSnorlaxRankIndex()
  .catch((e) => console.error('MongoDB failed to add Snorlax rank index', e));
