import {EffectiveBonus} from '@/types/game/bonus';


type GetCommonEnergyMultiplierOpts = {
  bonus: EffectiveBonus,
};

export const getCommonEnergyMultiplier = ({bonus}: GetCommonEnergyMultiplierOpts): number => {
  const {overall} = bonus;

  return (
    (1 + map / 100) *
    (1 + overall / 100)
  );
};
