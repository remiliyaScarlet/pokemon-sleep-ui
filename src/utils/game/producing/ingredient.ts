import {specialtyIdMap} from '@/const/game/pokemon';
import {Ingredient} from '@/types/game/ingredient';
import {
  ProducingRateCommonParams,
  ProducingRateOfItemOfSessions,
  ProducingRateProportion,
} from '@/types/game/producing/rate';
import {applyBonus} from '@/utils/game/producing/bonus';
import {getProducingRateBase} from '@/utils/game/producing/rate';


export type GetIngredientProducingRateOpts = ProducingRateCommonParams & {
  ingredient: Ingredient | undefined,
} & (
  ProducingRateProportion |
  {
    count?: never,
    picks?: never,
  }
);

export const getIngredientProducingRate = ({
  pokemon,
  frequency,
  bonus,
  ingredient,
  count,
  picks,
}: GetIngredientProducingRateOpts): ProducingRateOfItemOfSessions | null => {
  if (!ingredient) {
    return null;
  }

  const data = {
    id: ingredient.id,
    frequency,
    ...getProducingRateBase({
      frequency,
      count: count || (pokemon.specialty === specialtyIdMap.ingredient ? 2 : 1),
      picks: picks ?? 1,
      energyPerCount: ingredient.energy,
    }),
  };

  return {
    id: ingredient.id,
    sleep: applyBonus({
      bonus,
      produceType: 'ingredient',
      producingState: 'sleep',
      data,
    }),
    awake: applyBonus({
      bonus,
      produceType: 'ingredient',
      producingState: 'awake',
      data,
    }),
  };
};
