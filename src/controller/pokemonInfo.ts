import {Collection, FindCursor, WithId} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {IngredientId} from '@/types/mongo/ingredient';
import {PokemonByIngredientMap, PokemonId, PokemonInfo} from '@/types/mongo/pokemon';


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

export const getPokemonByIngredient = async (ingredientId: IngredientId | undefined): Promise<PokemonId[]> => {
  if (!ingredientId) {
    return [];
  }

  return (await getCollection())
    .find({ingredients: ingredientId}, {projection: {_id: false}})
    .map(({id}) => id)
    .toArray();
};

export const getPokemonByIngredients = async (ingredientIds: IngredientId[]): Promise<PokemonByIngredientMap> => {
  if (!ingredientIds.length) {
    return [];
  }

  const data = (await getCollection())
    .find({ingredients: {$in: ingredientIds}}, {projection: {_id: false}});

  const ret: PokemonByIngredientMap = {};
  for await (const entry of data) {
    entry.ingredients.forEach((ingredientId) => {
      if (!(ingredientId in ret) && ingredientIds.includes(ingredientId)) {
        ret[ingredientId] = [] as PokemonId[];
      }

      ret[ingredientId]?.push(entry.id);
    });
  }

  return ret;
};
