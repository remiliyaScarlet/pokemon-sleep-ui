import {EffectiveBonus} from '@/types/game/bonus';
import {ProducingRateOfItem} from '@/types/game/producing/rate';


type ApplyBonusOpts<T extends ProducingRateOfItem | null> = {
  bonus: EffectiveBonus,
  data: T,
  isIngredient: boolean,
};

export const applyBonus = <T extends ProducingRateOfItem | null>({
  bonus,
  data,
  isIngredient,
}: ApplyBonusOpts<T>): T => {
  if (!data) {
    return data;
  }

  const {ingredient, map, stamina, overall} = bonus;

  return {
    ...data,
    quantity: data.quantity * stamina,
    dailyEnergy: (
      data.dailyEnergy *
      (1 + (isIngredient ? (ingredient / 100) : 0)) *
      (1 + map / 100) *
      (1 + overall / 100) *
      stamina
    ),
  };
};
