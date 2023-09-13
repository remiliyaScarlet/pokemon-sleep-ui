import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {PokemonId} from '@/types/game/pokemon';
import {SleepdexData, SleepdexMarkedByMap, SleepdexMarkedByPokemon} from '@/types/game/sleepdex';
import {SleepMapId} from '@/types/game/sleepStyle';
import {SleepdexRecord} from '@/types/mongo/sleepdex';
import {toSleepdexByMapId, toSleepdexByPokemonId} from '@/utils/game/sleepdex';


const getCollection = async (): Promise<Collection<SleepdexRecord>> => {
  const client = await mongoPromise;

  return client
    .db('user')
    .collection<SleepdexRecord>('sleepdex');
};

export const getSleepdexByMap = async (userId: string, mapId: SleepMapId): Promise<SleepdexMarkedByMap> => {
  const collection = await getCollection();

  return Object.fromEntries(
    await collection.find({userId, mapId})
      .map((data) => [toSleepdexByMapId(data), true])
      .toArray(),
  );
};

export const getSleepdexByPokemon = async (userId: string, pokemonId: PokemonId): Promise<SleepdexMarkedByPokemon> => {
  const collection = await getCollection();

  return Object.fromEntries(
    await collection.find({userId, pokemonId})
      .map((data) => [toSleepdexByPokemonId(data), true])
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
    collection.createIndex([{userId: 1}, {pokemonId: 1}, {mapId: 1}, {styleId: 1}], {unique: true}),
  ]);
};

addSleepdexIndex()
  .catch((e) => console.error('MongoDB failed to initialize Sleepdex index', e));
