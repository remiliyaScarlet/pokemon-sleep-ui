import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {UserDataRecipeLevel} from '@/types/mongo/user';
import {CookingFilterRecipeLevel} from '@/ui/cooking/type';


const getCollection = async (): Promise<Collection<UserDataRecipeLevel>> => {
  const client = await mongoPromise;

  return client
    .db('user')
    .collection<UserDataRecipeLevel>('recipeLevel');
};

export const getUserRecipeLevel = async (userId: string) => {
  return (await getCollection()).findOne({userId});
};

export const setUserRecipeLevel = async (userId: string, recipeLevel: CookingFilterRecipeLevel) => {
  await (await getCollection()).updateOne({userId}, {$set: {recipeLevel}}, {upsert: true});
};

const addUserRecipeLevelIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({userId: 1}, {unique: true}),
  ]);
};

addUserRecipeLevelIndex()
  .catch((e) => console.error('MongoDB failed to add user recipe level index', e));
