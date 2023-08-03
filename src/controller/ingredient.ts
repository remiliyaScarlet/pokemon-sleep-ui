import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {Ingredient, IngredientMap} from '@/types/mongo/ingredient';


const getCollection = async (): Promise<Collection<Ingredient>> => {
  const client = await mongoPromise;

  return client
    .db('food')
    .collection<Ingredient>('ingredient');
};

export const getAllIngredients = async (): Promise<IngredientMap> => {
  return Object.fromEntries((await (await getCollection())
    .find({}, {projection: {_id: false}})
    .toArray())
    .map((ingredient) => [ingredient.id, ingredient]));
};

const addIngredientDataIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex({id: 1}, {unique: true}),
  ]);
};

addIngredientDataIndex()
  .catch((e) => console.error('MongoDB failed to add ingredient index', e));
