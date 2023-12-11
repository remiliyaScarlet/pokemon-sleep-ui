import groupBy from 'lodash/groupBy';

import {
  IngredientChain,
  ingredientLevels,
  IngredientProduction,
  IngredientProductionAtLevels,
} from '@/types/game/pokemon/ingredient';
import {toSum} from '@/utils/array';
import {cartesianIterator} from '@/utils/compute';
import {getEffectiveIngredientLevels} from '@/utils/game/producing/ingredient/level';
import {isNotNullish} from '@/utils/type';


export type GetPossibleIngredientProductionOpts = {
  level: number,
  chain: IngredientChain,
};

export const generatePossibleIngredientProductions = ({
  level,
  chain,
}: GetPossibleIngredientProductionOpts): Generator<IngredientProduction[]> => (
  cartesianIterator(getEffectiveIngredientLevels(level).map((level) => chain.ingredients[level]))
);

export const generateDefaultIngredientProductionAtLevels = (chain: IngredientChain): IngredientProductionAtLevels => {
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
