import groupBy from 'lodash/groupBy';

import {IngredientMap} from '@/types/game/ingredient';
import {IngredientProduction, IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {ProducingRateCommonParams, ProducingRateOfItemOfSessions} from '@/types/game/producing/rate';
import {getIngredientProducingRate} from '@/utils/game/producing/ingredient';
import {getEffectiveIngredientLevels} from '@/utils/game/producing/ingredientLevel';
import {getMergedItemRateOfSessions} from '@/utils/game/producing/rateReducer';
import {isNotNullish} from '@/utils/type';


export type GetIngredientProducingRatesOpts = ProducingRateCommonParams & {
  ingredients: IngredientProduction[],
  ingredientMap: IngredientMap,
};

export const getIngredientProducingRates = ({
  level,
  pokemon,
  ingredients,
  ingredientMap,
  ...opts
}: GetIngredientProducingRatesOpts): ProducingRateOfItemOfSessions[] => {
  const grouped = groupBy(
    ingredients
      .map(({id, qty}) => getIngredientProducingRate({
        level,
        pokemon,
        ingredient: id ? ingredientMap[id] : undefined,
        count: qty,
        picks: ingredients.length,
        ...opts,
      }))
      .filter(isNotNullish),
    (item) => item.id,
  );

  return Object.values(grouped).map((rates) => getMergedItemRateOfSessions(rates));
};

type GetEffectiveIngredientProductionsOpts = {
  level: number,
  ingredients: IngredientProductionAtLevels,
};

export const getEffectiveIngredientProductions = ({
  level,
  ingredients,
}: GetEffectiveIngredientProductionsOpts) => (
  getEffectiveIngredientLevels(level).map((level) => ingredients[level])
);
