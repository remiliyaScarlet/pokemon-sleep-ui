import {Collection, FindCursor, WithId} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {IngredientId} from '@/types/mongo/ingredient';
import {PokemonInfo, PokemonIngredientData} from '@/types/mongo/pokemon';


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

export const getPokemonByIngredient = async (ingredientId: IngredientId | undefined): Promise<PokemonInfo[]> => {
  if (!ingredientId) {
    return [];
  }

  return (await getCollection())
    .find({ingredients: ingredientId}, {projection: {_id: false}})
    .toArray();
};

export const getPokemonByIngredients = async (ingredientIds: IngredientId[]): Promise<PokemonIngredientData> => {
  const ret: PokemonIngredientData = {
    ingredient: {},
    info: {},
  };

  if (!ingredientIds.length) {
    return ret;
  }

  const data = (await getCollection())
    .find({ingredients: {$in: ingredientIds}}, {projection: {_id: false}});

  for await (const entry of data) {
    entry.ingredients.forEach((ingredientId) => {
      if (!(ingredientId in ret.ingredient) && ingredientIds.includes(ingredientId)) {
        ret.ingredient[ingredientId] = [] as PokemonInfo[];
      }

      ret.ingredient[ingredientId]?.push(entry);
      ret.info[entry.id] = entry;
    });
  }

  return ret;
};
