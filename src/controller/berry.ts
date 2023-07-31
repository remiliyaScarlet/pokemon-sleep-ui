import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {BerryData, BerryId} from '@/types/mongo/berry';


const getCollection = async (): Promise<Collection<BerryData>> => {
  const client = await mongoPromise;

  return client
    .db('food')
    .collection<BerryData>('berry');
};

export const getBerryData = async (id: BerryId | undefined): Promise<BerryData | null> => (
  id ? (await getCollection()).findOne({id}, {projection: {_id: false}}) : null
);

const addBerryDataIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({id: 1}, {unique: true}),
  ]);
};

addBerryDataIndex()
  .catch((e) => console.error('MongoDB failed to add berry index', e));
