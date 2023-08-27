import {Collection, Filter} from 'mongodb';

import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getPokemonAsMap} from '@/controller/pokemon';
import {PokedexMap} from '@/types/game/pokemon';
import {
  IngredientChain,
  IngredientChainMap,
  IngredientLevel,
  ingredientLevels,
  IngredientProduction,
} from '@/types/game/pokemon/ingredient';
import {PokeInBoxData} from '@/types/mongo/pokebox';


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

type MigrateRandomIngredientsOpts = {
  collection: Collection<PokeInBoxData>,
  pokedex: PokedexMap,
  ingredientChainMap: IngredientChainMap,
  filter: Filter<PokeInBoxData>,
};

const migrateRandomIngredients = async ({
  collection,
  pokedex,
  ingredientChainMap,
  filter,
}: MigrateRandomIngredientsOpts) => {
  for await (const pokeInBox of collection.find(filter)) {
    // @ts-ignore
    const randomIngredients = pokeInBox['randomIngredient'] as (RandomIngredient[] | undefined);
    const pokemon = pokedex[pokeInBox.pokemon];

    if (!randomIngredients?.length || !pokemon) {
      continue;
    }

    const chain = ingredientChainMap[pokemon.ingredientChain];

    await collection.updateOne(
      {_id: pokeInBox._id},
      {
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
    );
  }
};

const runRandomIngredientMigration = async (collection: Collection<PokeInBoxData>) => {
  const [pokedex, ingredientChainMap] = await Promise.all([
    getPokemonAsMap(),
    getIngredientChainMap(),
  ]);

  const filter: Filter<PokeInBoxData> = {ingredients: {$exists: false}};

  await migrateRandomIngredients({
    collection,
    pokedex,
    ingredientChainMap,
    filter,
  });

  const changeStream = collection.watch([{$match: filter}]);
  for await (const change of changeStream) {
    if (change.operationType === 'create' || change.operationType === 'modify') {
      await migrateRandomIngredients({
        collection,
        pokedex,
        ingredientChainMap,
        filter,
      });
    }
  }

  await changeStream.close();
};

export const runPokeBoxMigrations = async (getCollection: () => Promise<Collection<PokeInBoxData>>) => {
  const collection = await getCollection();

  return Promise.all([
    runRandomIngredientMigration(collection),
  ]);
};
