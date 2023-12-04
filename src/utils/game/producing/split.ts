import {durationOfDay} from '@/const/common';
import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ProduceSplit, ProducingSleepStateSplit} from '@/types/game/producing/split';
import {UserCalculationBehavior} from '@/types/userData/settings';
import {getNatureMultiplier} from '@/utils/game/nature';
import {getSubSkillBonusValue} from '@/utils/game/subSkill/effect';
import {isFullPack} from '@/utils/user/settings/utils';


export type GetProduceSplitOpts = {
  specialty: PokemonSpecialtyId | null,
  pokemonProducingParams: PokemonProducingParams,
  natureId: NatureId | null,
  subSkillBonus: GroupedSubSkillBonus | null,
  behavior: UserCalculationBehavior,
};

export const getProduceSplit = ({
  specialty,
  pokemonProducingParams,
  natureId,
  subSkillBonus,
  behavior,
}: GetProduceSplitOpts): ProduceSplit => {
  if (isFullPack({alwaysFullBack: behavior.alwaysFullPack, specialty})) {
    return {
      berry: 1,
      ingredient: 0,
      skill: 0,
    };
  }

  let ingredientSplit = pokemonProducingParams.ingredientSplit;

  for (const bonusValue of getSubSkillBonusValue(subSkillBonus, 'ingredientProbability')) {
    ingredientSplit *= (1 + bonusValue / 100);
  }
  ingredientSplit *= getNatureMultiplier({id: natureId, effect: 'rateOfIngredient'});

  return {
    berry: 1 - ingredientSplit,
    ingredient: ingredientSplit,
    skill: 1,
  };
};

type GetProducingSleepStateSplitOpts = {
  sleepDurationTotal: number,
  fullPackRatioInSleep: number,
};

export const getProducingSleepStateSplit = ({
  sleepDurationTotal,
  fullPackRatioInSleep,
}: GetProducingSleepStateSplitOpts): ProducingSleepStateSplit => {
  const sleep = sleepDurationTotal / durationOfDay;

  return {
    awake: 1 - sleep,
    sleepVacant: sleep * (1 - fullPackRatioInSleep),
    sleepFilled: sleep * fullPackRatioInSleep,
  };
};
