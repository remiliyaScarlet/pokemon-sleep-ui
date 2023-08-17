import {ProducingRateSingleParams} from '@/types/game/producing/rate';


export const defaultLevel = 1;

export const defaultHelperCount = 0;

export const defaultIngredientProbability = 20;

export const defaultBerryProbability = 100 - defaultIngredientProbability;

export const defaultNeutralOpts: ProducingRateSingleParams = {
  helperCount: defaultHelperCount,
  subSkillBonus: null,
  natureId: null,
};
