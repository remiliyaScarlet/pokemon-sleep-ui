import {EffectiveBonus} from '@/types/game/bonus';


type GetCommonEnergyMultiplierOpts = {
  bonus: EffectiveBonus,
};

export const getCommonEnergyMultiplier = ({bonus}: GetCommonEnergyMultiplierOpts): number => {
  const {overallMultiplier} = bonus;

  // `overall` only, as map bonus is handled differently in different branch
  // - Berry: Math.ceil(unit strength * map bonus)
  // - Ingredient: unit strength * map bonus
  // - Skill: Math.ceil(unit strength * map bonus)
  // >>> This might not be up-to-date, check the actual implementation
  return overallMultiplier;
};
