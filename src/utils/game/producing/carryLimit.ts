import {durationOfDay} from '@/const/common';
import {PokemonInfo} from '@/types/game/pokemon';
import {toSum} from '@/utils/array';


type GetTimeToFullPackInSleepOpts = {
  dailyCount: number,
  carryLimit: number,
};

export const getTimeToFullPackInSleep = ({
  dailyCount,
  carryLimit,
}: GetTimeToFullPackInSleepOpts): number => {
  return carryLimit / dailyCount * durationOfDay;
};

type GetCarryLimitFromPokemonInfoOpts = {
  pokemon: PokemonInfo,
};

export const getCarryLimitFromPokemonInfo = ({pokemon}: GetCarryLimitFromPokemonInfoOpts) => {
  const {stats, evolution} = pokemon;

  return stats.maxCarry + (evolution.stage - 1) * 5;
};

type GetCarryLimitMultiplierOpts = {
  dailyCount: number,
  carryLimit: number,
  sleepDurations: number[],
};

export const getCarryLimitMultiplier = ({
  dailyCount,
  carryLimit,
  sleepDurations,
}: GetCarryLimitMultiplierOpts) => {
  const timeToFullPack = getTimeToFullPackInSleep({dailyCount, carryLimit});
  const fullPackDuration = toSum(
    sleepDurations.map((duration) => Math.max(duration - timeToFullPack, 0)),
  );

  return (durationOfDay - fullPackDuration) / durationOfDay;
};
