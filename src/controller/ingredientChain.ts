import {Collection} from 'mongodb';

import {getDataAsMap} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {IngredientId} from '@/types/game/ingredient';
import {
  IngredientChain,
  IngredientChainMap,
  IngredientLevel,
  ingredientLevels,
} from '@/types/game/pokemon/ingredient';


const getCollection = async (): Promise<Collection<IngredientChain>> => {
  const client = await mongoPromise;

  return client
    .db('pokemon')
    .collection<IngredientChain>('ingredient');
};

export const getIngredientChainMap = async (): Promise<IngredientChainMap> => {
  return getDataAsMap(getCollection(), ({chainId}) => chainId);
};

export const getIngredientChainMapOfIngredient = async (ingredient: IngredientId) => {
  return getDataAsMap(
    getCollection(),
    ({chainId}) => chainId,
    {$or: ingredientLevels.map((level) => ({[`ingredients.${level}.id`]: ingredient}))},
  );
};

export const getIngredientChainMapOfLevel = async (
  level: IngredientLevel,
  ids: IngredientId[],
): Promise<IngredientChainMap> => {
  return getDataAsMap(getCollection(), ({chainId}) => chainId, {[`ingredients.${level}.id`]: {$in: ids}});
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({chainId: 1}, {unique: true}),
    ...ingredientLevels.map((level) => collection.createIndex({[`ingredients.${level}.id`]: 1})),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize ingredient chain index', e));
