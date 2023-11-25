import {Collection} from 'mongodb';

import {getDataAsMap, getSingleData} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {Ingredient, IngredientId, IngredientMap} from '@/types/game/ingredient';


const getCollection = async (): Promise<Collection<Ingredient>> => {
  const client = await mongoPromise;

  return client
    .db('food')
    .collection<Ingredient>('ingredient');
};

export const getIngredientData = async (id: IngredientId): Promise<Ingredient | null> => (
  getSingleData(getCollection(), {id})
);

export const getIngredientIds = async () => {
  return (await getCollection()).find({}, {projection: {id: 1}}).map(({id}) => id).toArray();
};

export const getAllIngredients = async (): Promise<IngredientMap> => {
  return getDataAsMap(getCollection(), ({id}) => id);
};

const addIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex({id: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize ingredient index', e));
