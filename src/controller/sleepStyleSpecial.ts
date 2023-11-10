import {Collection} from 'mongodb';

import {getDataAsArray} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {PokemonId} from '@/types/game/pokemon';
import {SleepStyleSpecial, SleepStyleSpecialMap} from '@/types/game/sleepStyle';


const getCollection = async (): Promise<Collection<SleepStyleSpecial>> => {
  const client = await mongoPromise;

  return client
    .db('pokemon')
    .collection<SleepStyleSpecial>('sleepStyle/noMap');
};

const getSleepStylesSpecial = async () => getDataAsArray(getCollection());

export const getSleepStyleSpecialMap = async (): Promise<SleepStyleSpecialMap> => {
  const ret: SleepStyleSpecialMap = {};
  for await (const entry of await getSleepStylesSpecial()) {
    if (!(entry.pokemonId in ret)) {
      ret[entry.pokemonId] = [] as SleepStyleSpecialMap[PokemonId];
    }

    ret[entry.pokemonId]?.push(entry);
  }

  return ret;
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex([{pokemonId: 1}, {style: 1}], {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize sleep style (no map) index', e));
