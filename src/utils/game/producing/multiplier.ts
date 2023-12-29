import {helperBonusEffectPerStack} from '@/const/game/production';
import {EffectiveBonus} from '@/types/game/bonus';
import {getAverage} from '@/utils/number/average';


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

export const getHelperBonusSimpleMultiplier = (maxMemberCount: number) => {
  const gains: number[] = [...Array(maxMemberCount).keys()]
    .map((i) => (1 - helperBonusEffectPerStack * i) / (1 - helperBonusEffectPerStack * (i + 1)) - 1);

  return 1 + getAverage(gains) * maxMemberCount;
};
