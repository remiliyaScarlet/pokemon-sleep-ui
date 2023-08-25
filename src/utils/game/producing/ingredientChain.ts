import groupBy from 'lodash/groupBy';

import {
  IngredientChain,
  ingredientLevels,
  IngredientProduction,
  IngredientProductionAtLevels,
} from '@/types/game/pokemon/ingredient';
import {toSum} from '@/utils/array';
import {cartesianIterator} from '@/utils/compute';
import {getEffectiveIngredientLevels} from '@/utils/game/producing/ingredientLevel';
import {isNotNullish} from '@/utils/type';


export type GetPossibleIngredientProductionsOpts = {
  level: number,
  chain: IngredientChain,
};

export const generatePossibleIngredientProductions = ({
  level,
  chain,
}: GetPossibleIngredientProductionsOpts): Generator<IngredientProduction[]> => (
  cartesianIterator(getEffectiveIngredientLevels(level).map((level) => chain.ingredients[level]))
);

export const generateIngredientProductionAtLevels = (chain: IngredientChain): IngredientProductionAtLevels => {
  return Object.fromEntries(ingredientLevels
    .map((ingredientLevel) => {
      const production = chain.ingredients[ingredientLevel].at(0);

      if (!production) {
        return null;
      }

      return [ingredientLevel, production];
    })
    .filter(isNotNullish));
};

export const groupIngredientProductions = (productions: IngredientProduction[]): IngredientProduction[] => {
  return Object
    .entries(groupBy(productions, (item) => item.id))
    .map(([id, productions]) => ({
      id: parseInt(id),
      qty: toSum(productions.map(({qty}) => qty)),
    }));
};
