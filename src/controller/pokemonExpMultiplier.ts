import {Collection} from 'mongodb';

import {getDataAsMap} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {PokemonExpMultiplier} from '@/types/game/pokemon/xp';


const getCollection = async (): Promise<Collection<PokemonExpMultiplier>> => {
  const client = await mongoPromise;

  return client
    .db('pokemon')
    .collection<PokemonExpMultiplier>('xpMultiplier');
};

export const getAllExpMultiplierData = async () => {
  return getDataAsMap(getCollection(), ({pokemon}) => pokemon);
};

const addPokemonExpMultiplierIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({pokemon: 1}, {unique: true}),
  ]);
};

addPokemonExpMultiplierIndex()
  .catch((e) => console.error('MongoDB failed to initialize Pokemon EXP multiplier index', e));
