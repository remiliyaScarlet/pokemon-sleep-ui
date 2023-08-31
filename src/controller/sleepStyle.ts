import {Collection} from 'mongodb';

import {getDataAsArray} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {PokemonId} from '@/types/game/pokemon';
import {
  FieldToSleepStyleFlattenedMap,
  PokemonSleepDataMap,
  SleepMapId,
  SleepStyleData,
  SleepStyleDataFlattened,
} from '@/types/game/sleepStyle';


const getCollection = async (): Promise<Collection<SleepStyleData>> => {
  const client = await mongoPromise;

  return client
    .db('pokemon')
    .collection<SleepStyleData>('sleepStyle');
};

const getSleepStyles = async () => (
  (await getCollection()).find({}, {projection: {_id: false}})
);

export const getPokemonSleepStyleMap = async (): Promise<PokemonSleepDataMap> => {
  const ret: PokemonSleepDataMap = {};
  for await (const entry of await getSleepStyles()) {
    if (!(entry.pokemonId in ret)) {
      ret[entry.pokemonId] = [] as PokemonSleepDataMap[PokemonId];
    }

    ret[entry.pokemonId]?.push(entry);
  }

  return ret;
};

export const getPokemonSleepStyles = async (pokemonId: number): Promise<SleepStyleData[]> => {
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

export const getSleepStyleOfMap = async (mapId: number): Promise<SleepStyleDataFlattened[]> => (
  (await (await getCollection()).find({mapId}, {projection: {_id: false}}).toArray())
    .flatMap(({styles, ...props}) => (
      styles.map((style) => ({style, ...props}))
    ))
);

const addSleepStyleIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex([{pokemonId: 1}, {mapId: 1}], {unique: true}),
    collection.createIndex({mapId: 1}),
  ]);
};

addSleepStyleIndex()
  .catch((e) => console.error('MongoDB failed to initialize sleep style index', e));
