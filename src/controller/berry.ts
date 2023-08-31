import {Collection} from 'mongodb';

import {getDataAsMap} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {BerryData, BerryDataMap, BerryId} from '@/types/game/berry';


const getCollection = async (): Promise<Collection<BerryData>> => {
  const client = await mongoPromise;

  return client
    .db('food')
    .collection<BerryData>('berry');
};

export const getBerryData = async (id: BerryId): Promise<BerryData | null> => (
  (await getCollection()).findOne({id}, {projection: {_id: false}})
);

export const getAllBerryData = async (): Promise<BerryDataMap> => {
  return getDataAsMap(getCollection(), ({id}) => id);
};

export const getPokemonMaxLevelByBerry = async (): Promise<number> => {
  const data = await (await getCollection()).findOne({});

  if (!data) {
    throw new Error('No berry data available for getting max pokemon level');
  }

  return data.energy.length;
};

const addBerryDataIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({id: 1}, {unique: true}),
  ]);
};

addBerryDataIndex()
  .catch((e) => console.error('MongoDB failed to add berry index', e));
