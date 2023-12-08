import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {PokemonShardConsumptionData} from '@/types/game/pokemon/xp';


const getCollection = async (): Promise<Collection<PokemonShardConsumptionData>> => {
  const client = await mongoPromise;

  return client
    .db('pokemon')
    .collection<PokemonShardConsumptionData>('xp/shard');
};

export const getExpShardConsumption = async (): Promise<PokemonShardConsumptionData | null> => {
  return (await getCollection()).findOne({}, {projection: {_id: false}});
};
