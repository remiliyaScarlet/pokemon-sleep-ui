import {getIngredientChainMapOfIngredient} from '@/controller/ingredientChain';
import {getAllPokemonAsArray} from '@/controller/pokemon/info';
import {IngredientId} from '@/types/game/ingredient';
import {PokemonIngredientProduction} from '@/types/game/pokemon';
import {ingredientLevels} from '@/types/game/pokemon/ingredient';
import {isNotNullish} from '@/utils/type';


export const getPokemonIngredientProduction = async (
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
