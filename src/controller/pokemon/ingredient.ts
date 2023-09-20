import {getIngredientChainMapOfIngredient} from '@/controller/ingredientChain';
import {getAllPokemonAsArray} from '@/controller/pokemon/info';
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
