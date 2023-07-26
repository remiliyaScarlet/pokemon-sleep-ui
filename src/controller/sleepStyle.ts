import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {PokemonSleepStyleMap, SleepStyle} from '@/types/mongo/sleepStyle';


const getCollection = async (): Promise<Collection<SleepStyle>> => {
  const client = await mongoPromise;

  return client
    .db('pokemon')
    .collection<SleepStyle>('sleepStyle');
};

export const getPokemonSleepStyleMap = async (): Promise<PokemonSleepStyleMap> => {
  const data = (await getCollection()).find({}, {projection: {_id: false}});

  const ret: PokemonSleepStyleMap = {};
  for await (const entry of data) {
    if (!(entry.pokemonId in ret)) {
      ret[entry.pokemonId] = [] as SleepStyle[];
    }

    ret[entry.pokemonId]?.push(entry);
  }

  return ret;
};

export const getPokemonSleepStyles = async (pokemonId: number): Promise<SleepStyle[]> => (
  (await getCollection()).find({pokemonId}, {projection: {_id: false}}).toArray()
);
