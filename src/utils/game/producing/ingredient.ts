import {specialtyIdMap} from '@/const/game/pokemon';
import {defaultHelperCount} from '@/const/game/production';
import {Ingredient} from '@/types/game/ingredient';
import {
  ProducingRateCommonParams,
  ProducingRateOfItemOfSessions,
  ProducingRateProportion,
} from '@/types/game/producing/rate';
import {getFrequencyFromPokemon} from '@/utils/game/producing/frequency';
import {getProducingRateBase} from '@/utils/game/producing/rate';
import {getProbabilitySplit} from '@/utils/game/producing/split';
import {applyBonus} from '@/utils/game/producing/utils';


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
  pokemonProducingParams,
  subSkillBonus,
  helperCount,
  natureId,
  bonus,
  ingredient,
  count,
  picks,
}: GetIngredientProducingRateOpts): ProducingRateOfItemOfSessions | null => {
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

  const frequency = baseFrequency / getProbabilitySplit({
    type: 'ingredient',
    pokemonProducingParams,
    natureId,
    subSkillBonus,
  });
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
      typeOfStamina: 'sleep',
      data,
      isIngredient: true,
    }),
    awake: applyBonus({
      bonus,
      typeOfStamina: 'awake',
      data,
      isIngredient: true,
    }),
  };
};
