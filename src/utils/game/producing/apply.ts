import {EffectiveBonus} from '@/types/game/bonus';
import {ProduceType} from '@/types/game/producing/common';
import {ProducingRateOfItem} from '@/types/game/producing/rate';
import {ProducingState} from '@/types/game/producing/state';
import {getEnergyMultiplier} from '@/utils/game/producing/multiplier';


type ApplyBonusOpts<T extends ProducingRateOfItem | null> = {
  bonus: EffectiveBonus,
  produceType: ProduceType,
  producingState: ProducingState,
  data: T,
};

export const applyBonus = <T extends ProducingRateOfItem | null>({
  bonus,
  produceType,
  producingState,
  data,
}: ApplyBonusOpts<T>): T => {
  if (!data) {
    return data;
  }

  const {stamina} = bonus;
  const staminaBonus = stamina[producingState];

  const energyMultiplier = getEnergyMultiplier({produceType, bonus});

  return {
    ...data,
    frequency: data.frequency / staminaBonus,
    quantity: data.quantity * staminaBonus,
    energy: data.energy * staminaBonus * energyMultiplier,
  };
};
