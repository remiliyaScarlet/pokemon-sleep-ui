import {EffectiveBonus} from '@/types/game/bonus';
import {ProduceType} from '@/types/game/producing/common';
import {ProducingRateOfItem, ProducingRateOfStates, ProducingValueOfStates} from '@/types/game/producing/rate';
import {ProducingState, producingStateOfRate} from '@/types/game/producing/state';
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

type ApplyMultiplierToProducingValueOfStatesOpts = {
  values: ProducingValueOfStates,
  multiplier: number,
};

export const applyMultiplierToProducingValueOfStates = ({
  values,
  multiplier,
}: ApplyMultiplierToProducingValueOfStatesOpts): ProducingValueOfStates => {
  return (
    Object.fromEntries(
      producingStateOfRate.map((state) => [state, values[state] * multiplier]),
    ) as ProducingValueOfStates
  );
};

type ApplyStaminaMultiplierOpts = {
  rate: ProducingRateOfStates,
  multiplier: {
    original: number,
    target: number,
  },
};

export const applyStaminaMultiplierOpts = ({rate, multiplier}: ApplyStaminaMultiplierOpts): ProducingRateOfStates => {
  const {original, target} = multiplier;
  const multiplierToApply = target / original;

  return {
    ...rate,
    frequency: applyMultiplierToProducingValueOfStates({
      values: rate.frequency,
      multiplier: 1 / multiplierToApply,
    }),
    quantity: applyMultiplierToProducingValueOfStates({
      values: rate.quantity,
      multiplier: multiplierToApply,
    }),
    energy: applyMultiplierToProducingValueOfStates({
      values: rate.energy,
      multiplier: multiplierToApply,
    }),
  };
};
