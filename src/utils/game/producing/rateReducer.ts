import {ProduceType} from '@/types/game/producing/common';
import {ProducingRateOfItem, ProducingRateOfItemOfSessions} from '@/types/game/producing/rate';
import {ProduceSplit, ProducingSleepStateSplit} from '@/types/game/producing/split';
import {toSum} from '@/utils/array';
import {getFrequencyFromItemRateOfSessions} from '@/utils/game/producing/frequency';
import {
  GetProduceSplitOpts,
  getProducingSleepStateSplit,
  GetProducingSleepStateSplitOpts,
} from '@/utils/game/producing/split';


type GetTotalRateOfItemOfSessionsOpts = GetProduceSplitOpts & GetProducingSleepStateSplitOpts & {
  rate: ProducingRateOfItemOfSessions,
  produceType: ProduceType,
  produceSplit: ProduceSplit,
};

export const getTotalRateOfItemOfSessions = (opts: GetTotalRateOfItemOfSessionsOpts): ProducingRateOfItem => {
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
    quantity: getValueAfterSplitFromItemSessionRate({
      ...opts,
      valueKey: 'quantity',
      sleepStateSplit,
      produceItemSplit,
    }),
    dailyEnergy: getValueAfterSplitFromItemSessionRate({
      ...opts,
      valueKey: 'dailyEnergy',
      sleepStateSplit,
      produceItemSplit,
    }),
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

type GetValueAfterSplitFromItemSessionRateOpts = {
  rate: ProducingRateOfItemOfSessions,
  valueKey: keyof ProducingRateOfItem,
  sleepStateSplit: ProducingSleepStateSplit,
  produceType: ProduceType,
  produceItemSplit: number,
};

export const getValueAfterSplitFromItemSessionRate = ({
  rate,
  valueKey,
  sleepStateSplit,
  produceType,
  produceItemSplit,
}: GetValueAfterSplitFromItemSessionRateOpts): number => {
  const {sleep, awake} = rate;

  return (
    (awake[valueKey] * sleepStateSplit.awake + sleep[valueKey] * sleepStateSplit.sleepVacant) * produceItemSplit +
    (produceType === 'berry' ? sleep[valueKey] * sleepStateSplit.sleepFilled : 0)
  );
};
