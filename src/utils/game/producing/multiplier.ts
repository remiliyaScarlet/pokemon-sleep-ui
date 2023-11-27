import {EffectiveBonus} from '@/types/game/bonus';


type GetEnergyMultiplierOpts = {
  bonus: EffectiveBonus,
};

export const getEnergyMultiplier = ({bonus}: GetEnergyMultiplierOpts): number => {
  const {map, overall} = bonus;

  return (
    (1 + map / 100) *
    (1 + overall / 100)
  );
};
