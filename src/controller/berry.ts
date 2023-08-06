import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {BerryData, BerryDataMap, BerryId} from '@/types/mongo/berry';


const getCollection = async (): Promise<Collection<BerryData>> => {
  const client = await mongoPromise;

  return client
    .db('food')
    .collection<BerryData>('berry');
};

export const getBerryData = async (id: BerryId | undefined): Promise<BerryData | null> => (
  id ? (await getCollection()).findOne({id}, {projection: {_id: false}}) : null
);

export const getAllBerryData = async (): Promise<BerryDataMap> => {
  const ret: BerryDataMap = {};

  for await (const berryData of (await getCollection()).find({}, {projection: {_id: false}})) {
    ret[berryData.id] = berryData;
  }

  return ret;
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
