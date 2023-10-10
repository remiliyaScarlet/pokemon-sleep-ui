import {productionMultiplierByPeriod} from '@/const/game/production';
import {
  PokemonProducingRate,
  ProducingRate,
  ProducingRateOfItem,
  ProducingRateOfItemOfSessions,
  ProducingRateOfStates,
  ProducingValueOfStates,
} from '@/types/game/producing/rate';
import {ProduceSplit, ProducingSleepStateSplit} from '@/types/game/producing/split';
import {ProducingStateOfRate} from '@/types/game/producing/state';
import {toSum} from '@/utils/array';
import {getFrequencyFromItemRateOfSessions} from '@/utils/game/producing/frequency';
import {GetProduceSplitOpts} from '@/utils/game/producing/split';
import {GetItemRateOfSessionCommonOpts, GetSpecificItemRateOfSessionCommonOpts} from '@/utils/game/producing/type';
import {KeysOfType} from '@/utils/type';


type GetProducingRateOfStatesOpts =
  GetProduceSplitOpts &
  GetItemRateOfSessionCommonOpts & {
    produceSplit: ProduceSplit,
    sleepStateSplit: ProducingSleepStateSplit,
  };

export const getProducingRateOfStates = (opts: GetProducingRateOfStatesOpts): ProducingRateOfStates => {
  const {
    period,
    rate,
    produceType,
    produceSplit,
    sleepStateSplit,
  } = opts;
  const {id} = rate;

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

type GetMergedItemRateOfSessionsOpts = {
  rates: ProducingRateOfItemOfSessions[],
  frequencyMultiplier: number,
};

export const getMergedItemRateOfSessions = ({
  rates,
  frequencyMultiplier,
}: GetMergedItemRateOfSessionsOpts): ProducingRateOfItemOfSessions => {
  const firstRate = rates.at(0);

  if (!firstRate) {
    throw new Error('Empty rate data for merging');
  }

  return {
    id: firstRate.id,
    sleep: {
      ...firstRate.sleep,
      frequency: firstRate.sleep.frequency * (frequencyMultiplier / rates.length),
      quantity: toSum(rates.map(({sleep}) => sleep.quantity)),
      energy: toSum(rates.map(({sleep}) => sleep.energy)),
    },
    awake: {
      ...firstRate.awake,
      frequency: firstRate.awake.frequency * (frequencyMultiplier / rates.length),
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

  const awake = (
    periodMultiplier * rate.awake[valueKey] * produceItemSplit * sleepStateSplit.awake
  );
  const sleepVacant = (
    periodMultiplier * rate.sleep[valueKey] * produceItemSplit * sleepStateSplit.sleepVacant
  );
  const sleepFilled = (
    periodMultiplier * (produceType === 'berry' ? rate.sleep[valueKey] : 0) * sleepStateSplit.sleepFilled
  );
  const equivalent = awake + sleepVacant + sleepFilled;

  return {awake, sleepVacant, sleepFilled, equivalent};
};

type GetTotalOfPokemonProducingRateOpts = {
  rate: PokemonProducingRate,
  state: ProducingStateOfRate,
};

export const getTotalOfPokemonProducingRate = ({
  rate,
  state,
}: GetTotalOfPokemonProducingRateOpts): ProducingRate => {
  const {period, berry, ingredient} = rate;

  return {
    period,
    quantity: (
      berry.quantity[state] +
      toSum(Object.values(ingredient).map(({quantity}) => quantity[state]))
    ),
    energy: (
      berry.energy[state] +
      toSum(Object.values(ingredient).map(({energy}) => energy[state]))
    ),
  };
};
