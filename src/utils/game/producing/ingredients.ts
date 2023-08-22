import groupBy from 'lodash/groupBy';

import {PokemonIngredientPick} from '@/types/game/producing/ingredient';
import {ProducingRateCommonParams, ProducingRateOfItem} from '@/types/game/producing/rate';
import {IngredientMap} from '@/types/game/ingredient';
import {toSum} from '@/utils/array';
import {getIngredientProducingRate} from '@/utils/game/producing/ingredient';
import {isNotNullish} from '@/utils/type';


type GetIngredientProducingRatesOpts = ProducingRateCommonParams & {
  ingredients: PokemonIngredientPick[],
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
    ingredients.map(({level: ingredientLevel, id, quantity}) => {
      if (ingredientLevel > level) {
        return null;
      }

      return getIngredientProducingRate({
        level,
        pokemon,
        ingredient: id ? ingredientMap[id] : undefined,
        count: quantity,
        picks: ingredients.filter((pick) => level >= pick.level).length,
        ...opts,
      });
    }).filter(isNotNullish),
    (item) => item.id,
  );

  return Object.entries(grouped).map(([id, rates]) => {
    return {
      id: parseInt(id),
      quantity: toSum(rates.map(({quantity}) => quantity)),
      dailyEnergy: toSum(rates.map(({dailyEnergy}) => dailyEnergy)),
    } satisfies ProducingRateOfItem;
  });
};
