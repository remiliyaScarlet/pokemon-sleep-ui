import {IngredientId} from '@/types/game/ingredient';
import {IngredientChain, IngredientLevel, ingredientLevels} from '@/types/game/pokemon/ingredient';
import {toUnique} from '@/utils/array';


export const getEffectiveIngredientLevels = (level: number | null): IngredientLevel[] => {
  if (level === null) {
    return [...ingredientLevels];
  }

  return ingredientLevels.filter((ingredientLevel) => level >= ingredientLevel);
};

type GetPossibleIngredientsFromChainOpts = {
  level: number | null,
  chain: IngredientChain,
};

export const getPossibleIngredientsFromChain = ({
  level,
  chain,
}: GetPossibleIngredientsFromChainOpts): IngredientId[] => (
  toUnique(
    getEffectiveIngredientLevels(level)
      .flatMap((level) => chain.ingredients[level].map(({id}) => id)),
  )
);
