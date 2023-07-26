import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {PokemonId} from '@/types/mongo/pokemon';
import {PokemonSleepDataMap, SleepStyleData} from '@/types/mongo/sleepStyle';
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
