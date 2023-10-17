import {durationOfDay} from '@/const/common';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ProduceSplit, ProducingSleepStateSplit} from '@/types/game/producing/split';
import {getNatureMultiplier} from '@/utils/game/nature';
import {getSubSkillBonusValue} from '@/utils/game/subSkill/effect';


export type GetProduceSplitOpts = {
  pokemonProducingParams: PokemonProducingParams,
  natureId: NatureId | null,
  subSkillBonus: GroupedSubSkillBonus | null,
};

export const getProduceSplit = ({
  pokemonProducingParams,
  natureId,
  subSkillBonus,
}: GetProduceSplitOpts): ProduceSplit => {
  let ingredientSplit = pokemonProducingParams.ingredientSplit;

  for (const bonusValue of getSubSkillBonusValue(subSkillBonus, 'ingredientProbability')) {
    ingredientSplit *= (1 + bonusValue / 100);
  }
  ingredientSplit *= getNatureMultiplier({id: natureId, effect: 'rateOfIngredient'});

  return {
    berry: 1 - ingredientSplit,
    ingredient: ingredientSplit,
  };
};

type GetProducingSleepStateSplitOpts = {
  sleepDuration: number,
  fullPackRatioInSleep: number,
};

export const getProducingSleepStateSplit = ({
  sleepDuration,
  fullPackRatioInSleep,
}: GetProducingSleepStateSplitOpts): ProducingSleepStateSplit => {
  const sleep = sleepDuration / durationOfDay;

  return {
    awake: 1 - sleep,
    sleepVacant: sleep * (1 - fullPackRatioInSleep),
    sleepFilled: sleep * fullPackRatioInSleep,
  };
};
