import {Collection} from 'mongodb';

import {getDataAsArray} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {Meal} from '@/types/mongo/meal';


const getCollection = async (): Promise<Collection<Meal>> => {
  const client = await mongoPromise;

  return client
    .db('food')
    .collection<Meal>('meal');
};

export const getAllMeals = async (): Promise<Meal[]> => {
  return getDataAsArray(getCollection());
};

export const getSingleMeal = async (id: number) => {
  return (await getCollection()).findOne({id}, {projection: {_id: false}});
};

export const getMealByIngredient = async (id: number | undefined): Promise<Meal[]> => {
  if (id === undefined) {
    return [];
  }

  return getDataAsArray(getCollection(), {'ingredients.id': id});
};

const addMealDataIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({id: 1}, {unique: true}),
    collection.createIndex({'ingredients.id': 1}),
  ]);
};

addMealDataIndex()
  .catch((e) => console.error('MongoDB failed to add meal index', e));
