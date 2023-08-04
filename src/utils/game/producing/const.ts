import {GetProducingRateChangeableOpts} from '@/utils/game/producing/type';


export const defaultLevel = 1;

export const defaultHelperCount = 0;

export const defaultIngredientProbability = 0.2;

export const defaultBerryProbability = 1 - defaultIngredientProbability;

export const defaultNeutralOpts: GetProducingRateChangeableOpts = {
  helperCount: 0,
  subSkillBonus: null,
  natureId: null,
};
