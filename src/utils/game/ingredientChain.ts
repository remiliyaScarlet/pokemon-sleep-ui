import {IngredientChain, IngredientProduction} from '@/types/game/pokemon/ingredient';
import {toUnique} from '@/utils/array';


type GetPossibleIngredientsFromChainOpts = {
  chain: IngredientChain,
  count: number,
};

export const getPossibleIngredientsFromChain = ({
  chain,
  count,
}: GetPossibleIngredientsFromChainOpts): IngredientProduction[] => {
  return toUnique(Object.values(chain.ingredients).flatMap((productions) => productions.map(({id}) => id)))
    .map((id) => ({id, qty: count}));
};
