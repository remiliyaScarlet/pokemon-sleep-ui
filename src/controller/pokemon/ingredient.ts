import {getIngredientChainMap, getIngredientChainMapOfIngredient} from '@/controller/ingredientChain';
import {getAllPokemonAsArray, getPokemonByBerry} from '@/controller/pokemon/info';
import {BerryId} from '@/types/game/berry';
import {IngredientId} from '@/types/game/ingredient';
import {PokemonIngredientProduction} from '@/types/game/pokemon';
import {isNotNullish} from '@/utils/type';


export const getPokemonIngredientProductionByIngredient = async (
  ingredientId: IngredientId,
): Promise<PokemonIngredientProduction[]> => {
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

      return {pokemonId: id, ingredientChainId: ingredientChain};
    })
    .filter(isNotNullish);
};

export const getPokemonIngredientProductionByBerry = async (
  berryId: BerryId,
): Promise<PokemonIngredientProduction[]> => {
  const [ingredientChainMap, pokemonArray] = await Promise.all([
    getIngredientChainMap(),
    getPokemonByBerry(berryId),
  ]);

  return pokemonArray
    .map(({id, ingredientChain}) => {
      const chain = ingredientChainMap[ingredientChain];

      if (!chain) {
        return null;
      }

      return {pokemonId: id, ingredientChainId: ingredientChain};
    })
    .filter(isNotNullish);
};
