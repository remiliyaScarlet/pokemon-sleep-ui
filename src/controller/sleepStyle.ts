import {Collection} from 'mongodb';

import {getDataAsArray} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {PokemonId} from '@/types/game/pokemon';
import {
  FieldToSleepStyleFlattenedMap,
  SleepStyleNormalMap,
  SleepMapId,
  SleepStyleNormal,
  SleepStyleNormalFlattened,
} from '@/types/game/sleepStyle';


const getCollection = async (): Promise<Collection<SleepStyleNormal>> => {
  const client = await mongoPromise;

  return client
    .db('pokemon')
    .collection<SleepStyleNormal>('sleepStyle');
};

const getAllSleepStylesNormal = async () => getDataAsArray(getCollection());

export const getSleepStyleNormalMap = async (): Promise<SleepStyleNormalMap> => {
  const ret: SleepStyleNormalMap = {};
  for await (const entry of await getAllSleepStylesNormal()) {
    if (!(entry.pokemonId in ret)) {
      ret[entry.pokemonId] = [] as SleepStyleNormalMap[PokemonId];
    }

    ret[entry.pokemonId]?.push(entry);
  }

  return ret;
};

export const getSleepStyleNormalList = async (pokemonId: number): Promise<SleepStyleNormal[]> => {
  return getDataAsArray(getCollection(), {pokemonId});
};

export const getSleepStyleByMaps = async (): Promise<FieldToSleepStyleFlattenedMap> => {
  const data = (await getCollection()).find({}, {projection: {_id: false}});

  const ret: FieldToSleepStyleFlattenedMap = {};
  for await (const entry of data) {
    if (!(entry.mapId in ret)) {
      ret[entry.mapId] = [] as FieldToSleepStyleFlattenedMap[SleepMapId];
    }

    const {styles, ...rest} = entry;

    ret[entry.mapId]?.push(...styles.map((style) => ({style, ...rest})));
  }

  return ret;
};

export const getSleepStyleNormalOfMap = async (mapId: number): Promise<SleepStyleNormalFlattened[]> => (
  (await (await getCollection()).find({mapId}, {projection: {_id: false}}).toArray())
    .flatMap(({styles, ...props}) => (
      styles.map((style) => ({style, ...props}))
    ))
);

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex([{pokemonId: 1}, {mapId: 1}], {unique: true}),
    collection.createIndex({mapId: 1}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize sleep style index', e));
