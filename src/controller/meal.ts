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
