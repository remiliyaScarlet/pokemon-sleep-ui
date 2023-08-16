import {specialtyIdMap} from '@/const/game/pokemon';
import {ProducingRateOfItem} from '@/types/game/producing/rate';
import {Ingredient} from '@/types/mongo/ingredient';
import {getNatureMultiplier} from '@/utils/game/nature';
import {defaultHelperCount, defaultIngredientProbability} from '@/utils/game/producing/const';
import {getFrequencyFromPokemon} from '@/utils/game/producing/frequency';
import {getProducingRateBase} from '@/utils/game/producing/rate';
import {GetProducingRateCommonOpts} from '@/utils/game/producing/type';


export type GetIngredientProducingRateOpts = GetProducingRateCommonOpts & {
  ingredient: Ingredient | undefined,
  count?: number,
  possibilities?: number,
};

export const getIngredientProducingRate = ({
  level,
  pokemon,
  subSkillBonus,
  helperCount,
  natureId,
  ingredient,
  count,
  possibilities,
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
      possibilities: possibilities ?? 1,
      energyPerCount: ingredient.energy,
    }),
  };
};
