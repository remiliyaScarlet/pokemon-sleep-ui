import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {PokemonId} from '@/types/game/pokemon';
import {SleepdexData, SleepdexMap} from '@/types/game/sleepdex';
import {SleepdexRecord} from '@/types/mongo/sleepdex';
import {toSleepdexStyleId} from '@/utils/game/sleepdex';


const getCollection = async (): Promise<Collection<SleepdexRecord>> => {
  const client = await mongoPromise;

  return client
    .db('user')
    .collection<SleepdexRecord>('sleepdex');
};

export const getSleepdexMap = async (userId: string): Promise<SleepdexMap> => {
  const collection = await getCollection();

  return Object.fromEntries(
    await collection.find({userId})
      .map((data) => [toSleepdexStyleId(data), true])
      .toArray(),
  );
};

export const getSleepdexMapOfPokemon = async (userId: string, pokemonId: PokemonId): Promise<SleepdexMap> => {
  const collection = await getCollection();

  return Object.fromEntries(
    await collection.find({userId, pokemonId})
      .map((data) => [toSleepdexStyleId(data), true])
      .toArray(),
  );
};

export const addSleepdexRecord = async (userId: string, record: SleepdexData) => (
  (await getCollection()).insertOne({userId, ...record})
);

export const removeSleepdexRecord = async (userId: string, record: SleepdexData) => (
  (await getCollection()).deleteOne({userId, ...record})
);

const addSleepdexIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({userId: 1}),
    collection.createIndex([{userId: 1}, {pokemonId: 1}, {styleId: 1}], {unique: true}),
  ]);
};

addSleepdexIndex()
  .catch((e) => console.error('MongoDB failed to initialize Sleepdex index', e));
