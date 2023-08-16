import {specialtyIdMap} from '@/const/game/pokemon';
import {ProducingRateOfItem} from '@/types/game/producing/rate';
import {Ingredient} from '@/types/mongo/ingredient';
import {getNatureMultiplier} from '@/utils/game/nature';
import {defaultHelperCount, defaultIngredientProbability} from '@/utils/game/producing/const';
import {getFrequencyFromPokemon} from '@/utils/game/producing/frequency';
import {getProducingRate} from '@/utils/game/producing/rate';
import {GetProducingRateCommonOpts} from '@/utils/game/producing/type';


export type GetIngredientProducingRateOpts = GetProducingRateCommonOpts & {
  ingredient: Ingredient | undefined,
  countPerHelp?: number,
};

export const getIngredientProducingRate = ({
  level,
  pokemon,
  subSkillBonus,
  helperCount,
  natureId,
  ingredient,
  countPerHelp,
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
    ...getProducingRate({
      frequency: baseFrequency / (probability - (ingredientNatureMultiplier - 1)),
      countPerHelp: countPerHelp || (pokemon.specialty === specialtyIdMap.ingredient ? 2 : 1),
      energyPerCount: ingredient.energy,
    }),
  };
};
