import {specialtyIdMap} from '@/const/game/pokemon';
import {ProducingRateCommonParams, ProducingRateOfItem, ProducingRateProportion} from '@/types/game/producing/rate';
import {Ingredient} from '@/types/mongo/ingredient';
import {getNatureMultiplier} from '@/utils/game/nature';
import {defaultHelperCount, defaultIngredientProbability} from '@/utils/game/producing/const';
import {getFrequencyFromPokemon} from '@/utils/game/producing/frequency';
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

  const probability = (defaultIngredientProbability + (subSkillBonus?.ingredientProbability ?? 0)) / 100;
  const ingredientNatureMultiplier = getNatureMultiplier({id: natureId, effect: 'frequencyOfIngredient'});

  return {
    id: ingredient.id,
    ...getProducingRateBase({
      frequency: baseFrequency / (probability - (ingredientNatureMultiplier - 1)),
      count: count || (pokemon.specialty === specialtyIdMap.ingredient ? 2 : 1),
      picks: picks ?? 1,
      energyPerCount: ingredient.energy,
    }),
  };
};
