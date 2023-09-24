import {EffectiveBonus} from '@/types/game/bonus';
import {ProduceType} from '@/types/game/producing/common';


type GetEnergyMultiplierOpts = {
  produceType: ProduceType,
  bonus: EffectiveBonus,
};

export const getEnergyMultiplier = ({produceType, bonus}: GetEnergyMultiplierOpts): number => {
  const {ingredient, map, overall} = bonus;

  return (
    (1 + (produceType === 'ingredient' ? (ingredient / 100) : 0)) *
    (1 + map / 100) *
    (1 + overall / 100)
  );
};
