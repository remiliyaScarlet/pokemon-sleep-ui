import {AnyBulkWriteOperation, Collection} from 'mongodb';

import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getPokemonAsMap} from '@/controller/pokemon';
import mongoPromise from '@/lib/mongodb';
import {
  IngredientChain,
  IngredientLevel,
  ingredientLevels,
  IngredientProduction,
} from '@/types/game/pokemon/ingredient';
import {PokeInBoxData} from '@/types/mongo/pokebox';


const getCollection = async (): Promise<Collection<PokeInBoxData>> => {
  const client = await mongoPromise;

  return client
    .db('user')
    .collection<PokeInBoxData>('pokebox');
};

type RandomIngredient = {
  level: IngredientLevel,
  id: number,
  quantity: number,
};

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

const addRandomIngredientMigration = async () => {
  const collection = await getCollection();
  const [pokedex, ingredientChainMap] = await Promise.all([
    getPokemonAsMap(),
    getIngredientChainMap(),
  ]);

  const bulkUpdate: AnyBulkWriteOperation<PokeInBoxData>[] = [];
  for await (const pokeInBox of collection.find({ingredients: {$exists: false}})) {
    // @ts-ignore
    const randomIngredients = pokeInBox['randomIngredient'] as (RandomIngredient[] | undefined);
    const pokemon = pokedex[pokeInBox.pokemon];

    if (!randomIngredients?.length || !pokemon) {
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

addMigrations()
  .catch((e) => console.error('MongoDB failed to do random ingredient migrations', e));
