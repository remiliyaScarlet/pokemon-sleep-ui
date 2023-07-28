import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {Meal} from '@/types/mongo/meal';


const getCollection = async (): Promise<Collection<Meal>> => {
  const client = await mongoPromise;

  return client
    .db('food')
    .collection<Meal>('meal');
};

export const getAllMeals = async (): Promise<Meal[]> => {
  return (await getCollection())
    .find({}, {projection: {_id: false}})
    .toArray();
};

export const getSingleMeal = async (id: number) => {
  return (await getCollection()).findOne({id}, {projection: {_id: false}});
};

export const getMealByIngredient = async (id: number | undefined): Promise<Meal[]> => {
  if (id === undefined) {
    return [];
  }

  return (await getCollection()).find({'ingredients.id': id}, {projection: {_id: false}}).toArray();
};
