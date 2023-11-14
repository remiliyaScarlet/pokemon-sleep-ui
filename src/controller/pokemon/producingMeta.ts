import {Collection} from 'mongodb';

import {getSingleData} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {PokemonProducingParamsMeta} from '@/types/game/pokemon/producing';


const getCollection = async (): Promise<Collection<PokemonProducingParamsMeta>> => {
  const client = await mongoPromise;

  return client
    .db('pokemon')
    .collection<PokemonProducingParamsMeta>('producing/meta');
};

export const getPokemonProducingParamsMeta = () => getSingleData(getCollection());
