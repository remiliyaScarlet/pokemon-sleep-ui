import {
  ProducingRateOfItem,
  ProducingRateOfItemOfSessions,
  ProducingRateOfStates,
  ProducingValueOfStates,
} from '@/types/game/producing/rate';
import {ProduceSplit} from '@/types/game/producing/split';
import {toSum} from '@/utils/array';
import {getFrequencyFromItemRateOfSessions} from '@/utils/game/producing/frequency';
import {
  GetProduceSplitOpts,
  getProducingSleepStateSplit,
  GetProducingSleepStateSplitOpts,
} from '@/utils/game/producing/split';
import {GetItemRateOfSessionCommonOpts, GetSpecificItemRateOfSessionCommonOpts} from '@/utils/game/producing/type';


type GetTotalItemRateOfSessionsOpts =
  GetProduceSplitOpts &
  GetProducingSleepStateSplitOpts &
  GetItemRateOfSessionCommonOpts & {
    produceSplit: ProduceSplit,
  };

export const getTotalItemRateOfSessions = (opts: GetTotalItemRateOfSessionsOpts): ProducingRateOfStates => {
  const {rate, produceSplit, produceType} = opts;
  const {id} = rate;
  const sleepStateSplit = getProducingSleepStateSplit(opts);

  const produceItemSplit = produceSplit[produceType];

  return {
    id,
    frequency: getFrequencyFromItemRateOfSessions({
      ...opts,
      sleepStateSplit,
      produceItemSplit,
    }),
    quantity: getValueAfterSplitFromItemRateOfSessions({
      ...opts,
      valueKey: 'quantity',
      sleepStateSplit,
      produceItemSplit,
    }),
    dailyEnergy: getValueAfterSplitFromItemRateOfSessions({
      ...opts,
      valueKey: 'dailyEnergy',
      sleepStateSplit,
      produceItemSplit,
    }),
  };
};

export const getMergedItemRateOfSessions = (
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

type GetValueAfterSplitFromItemSessionRateOpts = GetSpecificItemRateOfSessionCommonOpts & {
  valueKey: keyof ProducingRateOfItem,
};

export const getValueAfterSplitFromItemRateOfSessions = ({
  rate,
  produceType,
  produceItemSplit,
  sleepStateSplit,
  valueKey,
}: GetValueAfterSplitFromItemSessionRateOpts): ProducingValueOfStates => {
  const awake = rate.awake[valueKey] * produceItemSplit;
  const sleepVacant = rate.sleep[valueKey] * produceItemSplit;
  const sleepFilled = produceType === 'berry' ? rate.sleep[valueKey] : 0;
  const equivalent = (
    awake * sleepStateSplit.awake +
    sleepVacant * sleepStateSplit.sleepVacant +
    sleepFilled * sleepStateSplit.sleepFilled
  );

  return {awake, sleepVacant, sleepFilled, equivalent};
};
