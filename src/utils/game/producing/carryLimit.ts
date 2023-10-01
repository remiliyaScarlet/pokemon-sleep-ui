import {durationOfDay} from '@/const/common';
import {PokemonInfo} from '@/types/game/pokemon';
import {FullPackStats} from '@/types/game/producing/carryLimit';
import {ProducingRateOfItemOfSessions} from '@/types/game/producing/rate';
import {ProduceSplit} from '@/types/game/producing/split';
import {toSum} from '@/utils/array';


type GetSecondsToFullPackInSleepOpts = {
  dailyCount: number,
  carryLimit: number,
};

export const getSecondsToFullPackInSleep = ({
  dailyCount,
  carryLimit,
}: GetSecondsToFullPackInSleepOpts): number => {
  return carryLimit / dailyCount * durationOfDay;
};

type GetCarryLimitFromPokemonInfoOpts = {
  pokemon: PokemonInfo,
};

export const getCarryLimitFromPokemonInfo = ({pokemon}: GetCarryLimitFromPokemonInfoOpts) => {
  const {stats, evolution} = pokemon;

  return stats.maxCarry + (evolution.stage - 1) * 5;
};

type GetFullPackRatioInSleepOpts = {
  dailyCount: number,
  carryLimit: number,
  sleepDurations: number[],
};

export const getFullPackStats = ({
  dailyCount,
  carryLimit,
  sleepDurations,
}: GetFullPackRatioInSleepOpts): FullPackStats => {
  const secondsToFull = getSecondsToFullPackInSleep({dailyCount, carryLimit});
  const fullPackDuration = toSum(
    sleepDurations.map((duration) => Math.max(duration - secondsToFull, 0)),
  );

  return {
    secondsToFull,
    ratio: fullPackDuration / toSum(sleepDurations),
  };
};

type GetTheoreticalDailyQuantityInSleepOpts = {
  rate: {
    berry: ProducingRateOfItemOfSessions,
    ingredient: ProducingRateOfItemOfSessions[],
  },
  produceSplit: ProduceSplit,
};

export const getTheoreticalDailyQuantityInSleep = ({
  rate,
  produceSplit,
}: GetTheoreticalDailyQuantityInSleepOpts): number => {
  const {berry, ingredient} = rate;

  return (
    berry.sleep.quantity * produceSplit.berry +
    toSum(Object.values(ingredient).map(({sleep}) => sleep.quantity)) * produceSplit.ingredient
  );
};
