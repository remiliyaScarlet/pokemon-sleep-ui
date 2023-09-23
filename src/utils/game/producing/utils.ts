import {EffectiveBonus} from '@/types/game/bonus';
import {ProducingRateOfItem, ProducingRateOfItemOfSessions} from '@/types/game/producing/rate';
import {ProducingState} from '@/types/game/producing/state';
import {toSum} from '@/utils/array';
import {getFrequencyFromItemRateOfSessions} from '@/utils/game/producing/frequency';
import {getSleepAwakeSplit} from '@/utils/game/sleep';


type ApplyMultipliersAndBonusOpts<T extends ProducingRateOfItem | null> = {
  bonus: EffectiveBonus,
  producingState: ProducingState,
  data: T,
  isIngredient: boolean,
};

export const applyBonus = <T extends ProducingRateOfItem | null>({
  bonus,
  producingState,
  data,
  isIngredient,
}: ApplyMultipliersAndBonusOpts<T>): T => {
  if (!data) {
    return data;
  }

  const {ingredient, map, stamina, overall} = bonus;
  const staminaBonus = stamina[typeOfStamina];

  return {
    ...data,
    frequency: data.frequency / staminaBonus,
    quantity: data.quantity * staminaBonus,
    dailyEnergy: (
      data.dailyEnergy *
      (1 + (isIngredient ? (ingredient / 100) : 0)) *
      (1 + map / 100) *
      (1 + overall / 100) *
      staminaBonus
    ),
  };
};

type GetTotalRateOfItemOfSessionsOpts = {
  rate: ProducingRateOfItemOfSessions,
  sleepDuration: number,
  carryLimitMultiplier?: number,
};

export const getTotalRateOfItemOfSessions = ({
  rate,
  sleepDuration,
  carryLimitMultiplier = 1,
}: GetTotalRateOfItemOfSessionsOpts): ProducingRateOfItem => {
  const {id, sleep, awake} = rate;
  const split = getSleepAwakeSplit(sleepDuration);

  return {
    id,
    frequency: getFrequencyFromItemRateOfSessions({rate, sleepDuration}),
    quantity: (sleep.quantity * split.sleep * carryLimitMultiplier + awake.quantity * split.awake),
    dailyEnergy: (sleep.dailyEnergy * split.sleep * carryLimitMultiplier + awake.dailyEnergy * split.awake),
  };
};

export const getMergedRateOfItemOfSessions = (
  rates: ProducingRateOfItemOfSessions[],
): ProducingRateOfItemOfSessions => {
  const firstRate = rates.at(0);

  if (!firstRate) {
    throw new Error('Empty rate data for merging');
  }

  return {
    id: firstRate.id,
    sleep: {
      id: firstRate.id,
      frequency: firstRate.sleep.frequency,
      quantity: toSum(rates.map(({sleep}) => sleep.quantity)),
      dailyEnergy: toSum(rates.map(({sleep}) => sleep.dailyEnergy)),
    },
    awake: {
      id: firstRate.id,
      frequency: firstRate.awake.frequency,
      quantity: toSum(rates.map(({awake}) => awake.quantity)),
      dailyEnergy: toSum(rates.map(({awake}) => awake.dailyEnergy)),
    },
  };
};
