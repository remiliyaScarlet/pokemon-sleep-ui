import {Collection} from 'mongodb';

import {getDataAsArray, getDataAsMap} from '@/controller/common';
import {getIngredientChainMapOfIngredient, getIngredientChainMapOfLevel} from '@/controller/ingredientChain';
import mongoPromise from '@/lib/mongodb';
import {BerryId} from '@/types/game/berry';
import {IngredientId} from '@/types/game/ingredient';
import {
  PokedexMap,
  PokemonId,
  PokemonInfo,
  PokemonIngredientData,
  PokemonIngredientProduction,
} from '@/types/game/pokemon';
import {IngredientLevel, ingredientLevels} from '@/types/game/pokemon/ingredient';
import {isNotNullish} from '@/utils/type';


const getCollection = async (): Promise<Collection<PokemonInfo>> => {
  const client = await mongoPromise;

  return client
    .db('pokemon')
    .collection<PokemonInfo>('info');
};

export const getSinglePokemonInfo = async (id: number) => {
  return (await getCollection()).findOne({id}, {projection: {_id: false}});
};

export const getAllPokemonAsArray = async (): Promise<PokemonInfo[]> => {
  return getDataAsArray(getCollection());
};

export const getPokemonAsMap = async (ids?: PokemonId[]): Promise<PokedexMap> => {
  return getDataAsMap(getCollection(), ({id}) => id, ids ? {id: {$in: ids}} : {});
};

export const getPokemonIngredientProduction = async (
  ingredientId: IngredientId | undefined,
): Promise<PokemonIngredientProduction[]> => {
  if (!ingredientId) {
    return Object.fromEntries(ingredientLevels.map(() => []));
  }

  const [ingredientChainMap, pokemonArray] = await Promise.all([
    getIngredientChainMapOfIngredient(ingredientId),
    getAllPokemonAsArray(),
  ]);

  return pokemonArray
    .map(({id, ingredientChain}) => {
      const chain = ingredientChainMap[ingredientChain];

      if (!chain) {
        return null;
      }

      return {
        pokemon: id,
        productions: ingredientLevels.map((level) => chain.ingredients[level]
          .filter(({id}) => id === ingredientId)
          .map((production) => ({level, ...production})))
          .flat(),
      };
    })
    .filter(isNotNullish);
};

export const getPokemonByIngredients = async (ingredientIds: IngredientId[]): Promise<PokemonIngredientData> => {
  const ret: PokemonIngredientData = {
    ingredient: {
      1: {},
      30: {},
      60: {},
    },
  };

  if (!ingredientIds.length) {
    return ret;
  }

  const insertDataOfLevel = async (level: IngredientLevel) => {
    const chainMap = await getIngredientChainMapOfLevel(level, ingredientIds);

    const pokemon = await getDataAsArray(
      getCollection(),
      {ingredientChain: {$in: Object.values(chainMap).map(({chainId}) => chainId)}},
    );

    for (const {id, ingredientChain} of pokemon) {
      const {ingredients} = chainMap[ingredientChain];

      for (const {id: ingredientId, qty} of ingredients[level]) {
        if (!(ingredientId in ret.ingredient[level])) {
          ret.ingredient[level][ingredientId] = [];
        }

        ret.ingredient[level][ingredientId]?.push({pokemon: id, qty});
      }
    }
  };

  await Promise.all(ingredientLevels.map((level) => insertDataOfLevel(level)));

  return ret;
};

export const getPokemonByBerry = async (berryId: BerryId) => {
  return getDataAsArray(getCollection(), {'berry.id': berryId});
};

const addPokemonInfoIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({id: 1}, {unique: true}),
    collection.createIndex({'berry.id': 1}),
  ]);
};

addPokemonInfoIndex()
  .catch((e) => console.error('MongoDB failed to add pokemon info index', e));
