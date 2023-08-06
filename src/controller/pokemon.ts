import {Collection, Filter, FindCursor, WithId} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {IngredientId} from '@/types/mongo/ingredient';
import {
  PokedexMap,
  PokemonId,
  PokemonInfo,
  PokemonIngredientData,
  pokemonIngredientType,
  PokemonIngredientType,
  PokemonIngredientTypeMap,
} from '@/types/mongo/pokemon';


const getCollection = async (): Promise<Collection<PokemonInfo>> => {
  const client = await mongoPromise;

  return client
    .db('pokemon')
    .collection<PokemonInfo>('info');
};

export const getSinglePokemonInfo = async (id: number) => {
  return (await getCollection()).findOne({id}, {projection: {_id: false}});
};

export const getAllPokemonAsCursor = async (): Promise<FindCursor<WithId<PokemonInfo>>> => {
  return (await getCollection()).find({}, {projection: {_id: false}});
};

export const getAllPokemonAsArray = async (): Promise<PokemonInfo[]> => {
  return (await getAllPokemonAsCursor()).toArray();
};

const pokemonInfoToMap = async (filter: Filter<PokemonInfo>): Promise<PokedexMap> => {
  const ret: PokedexMap = {};

  for await (const pokemon of (await getCollection()).find(filter, {projection: {_id: false}})) {
    ret[pokemon.id] = pokemon;
  }

  return ret;
};

export const getAllPokemonAsMap = async (): Promise<PokedexMap> => {
  return pokemonInfoToMap({});
};

export const getPokemonAsMap = async (ids: PokemonId[]): Promise<PokedexMap> => {
  return pokemonInfoToMap({id: {$in: ids}});
};

export const getPokemonByIngredient = async (
  ingredientId: IngredientId | undefined,
): Promise<PokemonIngredientTypeMap> => {
  if (!ingredientId) {
    return {fixed: [], random: []};
  }

  const collection = await getCollection();

  const [fixed, random] = await Promise.all(pokemonIngredientType
    .map((type) => collection
      .find({[`ingredients.${type}`]: ingredientId}, {projection: {_id: false}})
      .toArray(),
    ),
  );

  return {fixed, random};
};

export const getPokemonByIngredients = async (ingredientIds: IngredientId[]): Promise<PokemonIngredientData> => {
  const ret: PokemonIngredientData = {
    ingredient: {
      fixed: {},
      random: {},
    },
  };

  if (!ingredientIds.length) {
    return ret;
  }

  const data = (await getCollection())
    .find(
      {$or: pokemonIngredientType.map((type) => ({[`ingredients.${type}`]: {$in: ingredientIds}}))},
      {projection: {_id: false}},
    );

  const insertData = (ingredientId: number | undefined, ingredientType: PokemonIngredientType, info: PokemonInfo) => {
    if (ingredientId === undefined) {
      return;
    }

    // `ingredientIds.includes(ingredientId)` because type of `random`
    // could contain the ingredient ID that is not to be queried
    if (!(ingredientId in ret.ingredient[ingredientType]) && ingredientIds.includes(ingredientId)) {
      ret.ingredient[ingredientType][ingredientId] = [];
    }

    ret.ingredient[ingredientType][ingredientId]?.push(info.id);
  };

  for await (const entry of data) {
    insertData(entry.ingredients.fixed, 'fixed', entry);

    entry.ingredients.random?.forEach((ingredientId) => {
      insertData(ingredientId, 'random', entry);
    });
  }

  return ret;
};

const addPokemonInfoIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({id: 1}, {unique: true}),
    ...pokemonIngredientType.map((type) => collection.createIndex({[`ingredients.${type}`]: 1})),
  ]);
};

addPokemonInfoIndex()
  .catch((e) => console.error('MongoDB failed to add pokemon info index', e));
