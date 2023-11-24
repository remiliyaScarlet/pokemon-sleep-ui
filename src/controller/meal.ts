import {Collection} from 'mongodb';

import {getDataAsArray, getDataAsMap, getSingleData} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {Meal, MealMap} from '@/types/game/meal/main';


const getCollection = async (): Promise<Collection<Meal>> => {
  const client = await mongoPromise;

  return client
    .db('food')
    .collection<Meal>('meal');
};

export const getAllMeals = (): Promise<Meal[]> => getDataAsArray(getCollection());

export const getAllMealsAsMap = (): Promise<MealMap> => getDataAsMap(getCollection(), ({id}) => id);

export const getSingleMeal = async (id: number) => (
  getSingleData(getCollection(), {id})
);

export const getMealByIngredient = async (id: number): Promise<Meal[]> => (
  getDataAsArray(getCollection(), {'ingredients.id': id})
);

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({id: 1}, {unique: true}),
    collection.createIndex({'ingredients.id': 1}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize meal index', e));
