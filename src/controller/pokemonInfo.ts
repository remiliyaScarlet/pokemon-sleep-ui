import {Collection, FindCursor, WithId} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {PokemonInfo} from '@/types/mongo/pokemon';


const getCollection = async (): Promise<Collection<PokemonInfo>> => {
  const client = await mongoPromise;

  return client
    .db('pokemon')
    .collection<PokemonInfo>('info');
};

export const getSinglePokemonInfo = async (id: number) => {
  return (await getCollection()).findOne({id}, {projection: {_id: false}});
};

export const getAllPokedex = async (): Promise<FindCursor<WithId<PokemonInfo>>> => {
  return (await getCollection()).find({}, {projection: {_id: false}});
};
