import groupBy from 'lodash/groupBy';

import {IngredientMap} from '@/types/game/ingredient';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {ProducingRateCommonParams, ProducingRateOfItem} from '@/types/game/producing/rate';
import {toSum} from '@/utils/array';
import {getIngredientProducingRate} from '@/utils/game/producing/ingredient';
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
}: GetIngredientProducingRatesOpts): ProducingRateOfItem[] => {
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

  return Object.entries(grouped).map(([id, rates]): ProducingRateOfItem => ({
    id: parseInt(id),
    quantity: toSum(rates.map(({quantity}) => quantity)),
    dailyEnergy: toSum(rates.map(({dailyEnergy}) => dailyEnergy)),
  }));
};
