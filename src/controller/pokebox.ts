import {AnyBulkWriteOperation, Collection} from 'mongodb';

import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getPokemonAsMap} from '@/controller/pokemon';
import mongoPromise from '@/lib/mongodb';
import {Pokebox} from '@/types/game/pokebox';
import {
  IngredientChain,
  IngredientLevel,
  ingredientLevels,
  IngredientProduction,
} from '@/types/game/pokemon/ingredient';
import {PokeInBoxData} from '@/types/mongo/pokebox';
import {isNotNullish} from '@/utils/type';


const getCollection = async (): Promise<Collection<PokeInBoxData>> => {
  const client = await mongoPromise;

  return client
    .db('user')
    .collection<PokeInBoxData>('pokebox');
};

export const getUserPokebox = async (owner: string | undefined): Promise<Pokebox> => {
  if (!owner) {
    return {};
  }

  const pokeboxArray = await (await getCollection())
    .find({owner}, {projection: {owner: false, _id: false}})
    .toArray();

  return Object.fromEntries(pokeboxArray.map((pokeInBox) => [pokeInBox.uuid, pokeInBox]));
};

export const updateUserPokebox = async (owner: string, pokebox: Pokebox) => {
  await (await mongoPromise).withSession(async (session) => {
    await session.withTransaction(async () => {
      const collection = await getCollection();

      await collection.deleteMany({owner}, {session});
      const pokeboxAsArray = Object.values(pokebox).filter(isNotNullish);
      if (pokeboxAsArray.length) {
        await collection.insertMany(
          pokeboxAsArray.map((pokemon): PokeInBoxData => ({...pokemon, owner})),
          {session},
        );
      }
    });
  });
};

const addPokeboxIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({owner: 1}),
    collection.createIndex({uuid: 1}, {unique: true}),
  ]);
};

const addRandomIngredientMigration = async () => {
  type RandomIngredient = {level: IngredientLevel, id: number, quantity: number};

  const randomIngredientToProduction = (
    chain: IngredientChain,
    level: IngredientLevel,
    randomIngredient?: RandomIngredient,
  ): IngredientProduction => {
    if (!randomIngredient) {
      const ret = chain.ingredients[level].at(0);

      if (!ret) {
        throw new Error(`Chain ID #${chain} doesn't have production at level ${level}`);
      }

      return ret;
    }

    const possibilities = chain.ingredients[randomIngredient.level];

    const production = possibilities
      .find(({id, qty}) => randomIngredient.id === id && randomIngredient.quantity === qty);

    if (production) {
      return production;
    }

    const productionOfSameId = possibilities
      .find(({id}) => randomIngredient.id === id);

    if (productionOfSameId) {
      return productionOfSameId;
    }

    return possibilities[0];
  };

  const collection = await getCollection();
  const [pokedex, ingredientChainMap] = await Promise.all([
    getPokemonAsMap(),
    getIngredientChainMap(),
  ]);

  const bulkUpdate: AnyBulkWriteOperation<PokeInBoxData>[] = [];
  for await (const pokeInBox of collection.find({})) {
    // @ts-ignore
    const randomIngredients = pokeInBox['randomIngredient'] as RandomIngredient[];
    const pokemon = pokedex[pokeInBox.pokemon];

    if (!randomIngredients.length || !pokemon) {
      continue;
    }

    const chain = ingredientChainMap[pokemon.ingredientChain];

    bulkUpdate.push({
      updateOne: {
        filter: {_id: pokeInBox._id},
        update: {
          $set: {
            ingredients: Object.fromEntries(ingredientLevels.map((level) => [
              level,
              randomIngredientToProduction(
                chain,
                level,
                randomIngredients.find((random) => random.level === level),
              ),
            ])) as Record<IngredientLevel, IngredientProduction>,
          },
        },
      },
    });
  }

  if (bulkUpdate.length) {
    await collection.bulkWrite(bulkUpdate, {ordered: false});
  }
};

const addMigrations = () => {
  return Promise.all([
    addRandomIngredientMigration(),
  ]);
};

addPokeboxIndex()
  .catch((e) => console.error('MongoDB failed to add Pokebox index', e));

addMigrations()
  .catch((e) => console.error('MongoDB failed to do migrations', e));
