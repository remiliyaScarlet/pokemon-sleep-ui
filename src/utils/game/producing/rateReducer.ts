import {productionMultiplierByPeriod} from '@/const/game/production';
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
import {KeysOfType} from '@/utils/type';


type GetTotalItemRateOfSessionsOpts =
  GetProduceSplitOpts &
  GetProducingSleepStateSplitOpts &
  GetItemRateOfSessionCommonOpts & {
    produceSplit: ProduceSplit,
  };

export const getTotalItemRateOfSessions = (opts: GetTotalItemRateOfSessionsOpts): ProducingRateOfStates => {
  const {period, rate, produceSplit, produceType} = opts;
  const {id} = rate;
  const sleepStateSplit = getProducingSleepStateSplit(opts);

  const produceItemSplit = produceSplit[produceType];

  return {
    id,
    period,
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
    energy: getValueAfterSplitFromItemRateOfSessions({
      ...opts,
      valueKey: 'energy',
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
      ...firstRate.sleep,
      quantity: toSum(rates.map(({sleep}) => sleep.quantity)),
      energy: toSum(rates.map(({sleep}) => sleep.energy)),
    },
    awake: {
      ...firstRate.awake,
      quantity: toSum(rates.map(({awake}) => awake.quantity)),
      energy: toSum(rates.map(({awake}) => awake.energy)),
    },
  };
};

type GetValueAfterSplitFromItemSessionRateOpts = GetSpecificItemRateOfSessionCommonOpts & {
  valueKey: KeysOfType<ProducingRateOfItem, number>,
};

export const getValueAfterSplitFromItemRateOfSessions = ({
  period,
  rate,
  produceType,
  produceItemSplit,
  sleepStateSplit,
  valueKey,
}: GetValueAfterSplitFromItemSessionRateOpts): ProducingValueOfStates => {
  const periodMultiplier = productionMultiplierByPeriod[period];

  const awake = periodMultiplier * rate.awake[valueKey] * produceItemSplit;
  const sleepVacant = periodMultiplier * rate.sleep[valueKey] * produceItemSplit;
  const sleepFilled = periodMultiplier * (produceType === 'berry' ? rate.sleep[valueKey] : 0);
  const equivalent = (
    awake * sleepStateSplit.awake +
    sleepVacant * sleepStateSplit.sleepVacant +
    sleepFilled * sleepStateSplit.sleepFilled
  );

  return {awake, sleepVacant, sleepFilled, equivalent};
};
