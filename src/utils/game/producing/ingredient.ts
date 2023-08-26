import {specialtyIdMap} from '@/const/game/pokemon';
import {Ingredient} from '@/types/game/ingredient';
import {ProducingRateCommonParams, ProducingRateOfItem, ProducingRateProportion} from '@/types/game/producing/rate';
import {defaultHelperCount} from '@/utils/game/producing/const';
import {getFrequencyFromPokemon} from '@/utils/game/producing/frequency';
import {getProducingRateBase} from '@/utils/game/producing/rate';
import {getProbabilitySplit} from '@/utils/game/producing/split';


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
  level,
  pokemon,
  subSkillBonus,
  helperCount,
  natureId,
  ingredient,
  count,
  picks,
}: GetIngredientProducingRateOpts): ProducingRateOfItem | null => {
  if (!ingredient) {
    return null;
  }

  const baseFrequency = getFrequencyFromPokemon({
    level,
    pokemon,
    subSkillBonus: subSkillBonus ?? {},
    helperCount: helperCount ?? defaultHelperCount,
    natureId,
  });

  return {
    id: ingredient.id,
    ...getProducingRateBase({
      frequency: baseFrequency / getProbabilitySplit({type: 'ingredient', natureId, subSkillBonus}),
      count: count || (pokemon.specialty === specialtyIdMap.ingredient ? 2 : 1),
      picks: picks ?? 1,
      energyPerCount: ingredient.energy,
    }),
  };
};
