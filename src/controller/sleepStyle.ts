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
  const data = await (await getCollection()).find().toArray();

  const ret: PokemonSleepStyleMap = {};
  for (const entry of data) {
    if (!(entry.pokemonId in ret)) {
      ret[entry.pokemonId] = [] as SleepStyle[];
    }

    // Remove `_id`
    const {_id, ...rest} = entry;
    ret[entry.pokemonId]?.push(rest);
  }

  return ret;
};
