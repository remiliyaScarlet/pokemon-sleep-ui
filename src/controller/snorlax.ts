import {Collection} from 'mongodb';

import {getDataAsArray, getSingleData} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {SleepMapId} from '@/types/game/sleepStyle';
import {SnorlaxDataOfMap} from '@/types/game/snorlax';


const getCollection = async (): Promise<Collection<SnorlaxDataOfMap>> => {
  const client = await mongoPromise;

  return client
    .db('map')
    .collection<SnorlaxDataOfMap>('snorlax');
};

export const getSnorlaxData = async () => {
  return getDataAsArray(getCollection());
};

export const getSnorlaxDataOfMap = async (mapId: SleepMapId) => (
  getSingleData(getCollection(), {mapId})
);

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({mapId: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize Snorlax data index', e));
