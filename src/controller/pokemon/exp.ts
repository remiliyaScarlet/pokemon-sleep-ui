import {Collection} from 'mongodb';

import {getDataAsArray} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {PokemonExpData} from '@/types/game/pokemon/xp';


const getCollection = async (): Promise<Collection<PokemonExpData>> => {
  const client = await mongoPromise;

  return client
    .db('pokemon')
    .collection<PokemonExpData>('xp');
};

export const getAllExpDataSorted = async () => {
  return getDataAsArray(getCollection(), {}, {lv: 1});
};

const addPokemonExpDataIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({lv: 1}, {unique: true}),
  ]);
};

addPokemonExpDataIndex()
  .catch((e) => console.error('MongoDB failed to initialize Pokemon EXP data index', e));
