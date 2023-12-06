import {productionMultiplierByPeriod} from '@/const/game/production';
import {
  GroupedProducingRate,
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
import {isNotNullish, KeysOfType} from '@/utils/type';


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
  const unfilledOnly = awake + sleepVacant;
  const equivalent = unfilledOnly + sleepFilled;

  return {awake, sleepVacant, sleepFilled, equivalent, unfilledOnly};
};

type GetTotalOfItemRatesOpts = {
  rates: ProducingRateOfStates[],
  target: KeysOfType<ProducingRate, number>,
  state: ProducingStateOfRate,
};

export const getTotalOfItemRates = ({rates, target, state}: GetTotalOfItemRatesOpts): number => (
  toSum(rates.map((rate) => rate[target][state]))
);

type GetTotalOfGroupedProducingRateOpts = {
  rate: GroupedProducingRate<number>
  key: KeysOfType<ProducingRate, number>,
};

export const getTotalOfGroupedProducingRate = ({rate, key}: GetTotalOfGroupedProducingRateOpts) => {
  return toSum(Object.values(rate).filter(isNotNullish).map((rate) => rate[key]));
};

type GetPokemonProducingRateComponentOpts = {
  rate: PokemonProducingRate,
  target: KeysOfType<ProducingRate, number>,
  state: ProducingStateOfRate,
};

export const getTotalIngredientRateOfPokemon = ({
  rate,
  target,
  state,
}: GetPokemonProducingRateComponentOpts) => (
  getTotalOfItemRates({rates: Object.values(rate.ingredient), target, state})
);

export const getTotalOfPokemonProducingRate = ({
  rate,
  state,
}: Omit<GetPokemonProducingRateComponentOpts, 'target'>): ProducingRate => {
  const {period, berry, skill} = rate;

  return {
    period,
    quantity: (
      // Not adding `skill.energy[state]` here because this quantity is used for calculating carry limit,
      // but skill trigger count doesn't occupy inventory space
      berry.quantity[state] +
      getTotalIngredientRateOfPokemon({rate, target: 'quantity', state})
    ),
    energy: (
      berry.energy[state] +
      getTotalIngredientRateOfPokemon({rate, target: 'energy', state}) +
      skill.energy[state]
    ),
  };
};

export const getTotalEnergyOfPokemonProducingRate = (rate: PokemonProducingRate): number => {
  return getTotalOfPokemonProducingRate({rate, state: 'equivalent'}).energy;
};
