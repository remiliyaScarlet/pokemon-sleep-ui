import {NatureEffectId, NatureEffectType} from '@/types/game/producing/nature';


export const specialtyIdMap = {
  berry: 1,
  ingredient: 2,
  skill: 3,
};

export const natureEffectIdMap: {[type in NatureEffectType]: NatureEffectId} = {
  mainSkill: 1,
  exp: 2,
  energy: 3,
  frequencyOfIngredient: 4,
  frequencyOfBase: 5,
};
