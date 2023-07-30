import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {PokemonId} from '@/types/mongo/pokemon';
import {FieldToSleepStyleMap, PokemonSleepDataMap, SleepMapId, SleepStyleData} from '@/types/mongo/sleepStyle';
import {PokemonProps} from '@/ui/pokedex/page/type';


const getCollection = async (): Promise<Collection<SleepStyleData>> => {
  const client = await mongoPromise;

  return client
    .db('pokemon')
    .collection<SleepStyleData>('sleepStyle');
};

export const getPokemonSleepStyleMap = async (): Promise<PokemonSleepDataMap> => {
  const data = (await getCollection()).find({}, {projection: {_id: false}});

  const ret: PokemonSleepDataMap = {};
  for await (const entry of data) {
    if (!(entry.pokemonId in ret)) {
      ret[entry.pokemonId] = [] as PokemonSleepDataMap[PokemonId];
    }

    ret[entry.pokemonId]?.push(entry);
  }

  return ret;
};

export const getPokemonSleepStyles = async (pokemonId: number): Promise<PokemonProps['sleepStyles']> => (
  (await getCollection()).find({pokemonId}, {projection: {_id: false}}).toArray()
);

export const getSleepStyleByLocations = async (): Promise<FieldToSleepStyleMap> => {
  const data = (await getCollection()).find({}, {projection: {_id: false}});

  const ret: FieldToSleepStyleMap = {};
  for await (const entry of data) {
    if (!(entry.mapId in ret)) {
      ret[entry.mapId] = [] as FieldToSleepStyleMap[SleepMapId];
    }

    ret[entry.mapId]?.push(entry);
  }

  return ret;
};

const addSleepStyleIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex([{pokemonId: 1}, {mapId: 1}], {unique: true}),
    (await getCollection()).createIndex({mapId: 1}),
  ]);
};

addSleepStyleIndex()
  .catch((e) => console.error('MongoDB failed to add sleep style index', e));
