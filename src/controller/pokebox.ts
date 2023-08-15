import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {Pokebox} from '@/types/game/pokebox';
import {PokeInBoxData} from '@/types/mongo/pokebox';


const getCollection = async (): Promise<Collection<PokeInBoxData>> => {
  const client = await mongoPromise;

  return client
    .db('user')
    .collection<PokeInBoxData>('pokebox');
};

export const getUserPokebox = async (owner: string | undefined): Promise<Pokebox> => {
  if (!owner) {
    return [];
  }

  return (await getCollection()).find({owner}, {projection: {owner: false, _id: 'id'}}).toArray();
};

const addPokeboxIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({owner: 1}, {unique: true}),
  ]);
};

addPokeboxIndex()
  .catch((e) => console.error('MongoDB failed to add Pokebox index', e));
