import {Collection} from 'mongodb';

import {getDataAsArray, getSingleData} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {SleepMapId} from '@/types/game/sleepStyle';
import {SnorlaxRankInMap} from '@/types/game/snorlax';


const getCollection = async (): Promise<Collection<SnorlaxRankInMap>> => {
  const client = await mongoPromise;

  return client
    .db('snorlax')
    .collection<SnorlaxRankInMap>('rank');
};

export const getSnorlaxRank = async () => {
  return getDataAsArray(getCollection());
};

export const getSnorlaxRankOfMap = async (mapId: SleepMapId) => (
  getSingleData(getCollection(), {mapId})
);

const addSnorlaxRankIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({mapId: 1}, {unique: true}),
  ]);
};

addSnorlaxRankIndex()
  .catch((e) => console.error('MongoDB failed to initialize Snorlax rank index', e));
