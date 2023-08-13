import {GetProducingRateChangeableOpts} from '@/utils/game/producing/type';


export const defaultLevel = 1;

export const defaultHelperCount = 0;

export const defaultIngredientProbability = 20;

export const defaultBerryProbability = 100 - defaultIngredientProbability;

export const defaultNeutralOpts: GetProducingRateChangeableOpts = {
  helperCount: 0,
  subSkillBonus: null,
  natureId: null,
};
