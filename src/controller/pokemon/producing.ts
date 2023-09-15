import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';


const getCollection = async (): Promise<Collection<PokemonProducingParams>> => {
  const client = await mongoPromise;

  return client
    .db('pokemon')
    .collection<PokemonProducingParams>('producing');
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({pokemonId: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to add Pokemon producing params index', e));
