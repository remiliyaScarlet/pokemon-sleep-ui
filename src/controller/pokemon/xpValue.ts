import {Collection} from 'mongodb';

import {getDataAsMap} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {PokemonExpValueData, PokemonExpValueMap} from '@/types/game/pokemon/xp';


const getCollection = async (): Promise<Collection<PokemonExpValueData>> => {
  const client = await mongoPromise;

  return client
    .db('pokemon')
    .collection<PokemonExpValueData>('xp/value');
};

export const getAllExpValueSorted = async (): Promise<PokemonExpValueMap> => {
  return getDataAsMap(getCollection(), ({type}) => type);
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({type: 1}, {unique: true}),
  ]);
};

addIndex()
  .catch((e) => console.error('MongoDB failed to initialize Pokemon EXP value index', e));
