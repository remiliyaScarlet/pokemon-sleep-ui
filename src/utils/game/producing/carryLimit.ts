import {durationOfDay} from '@/const/common';
import {PokemonInfo} from '@/types/game/pokemon';
import {toSum} from '@/utils/array';


type GetNoCollectDurationToFullPackOpts = {
  dailyCount: number,
  carryLimit: number,
};

export const getNoCollectToFullPackDuration = ({
  dailyCount,
  carryLimit,
}: GetNoCollectDurationToFullPackOpts): number => {
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
  noCollectDurations: number[],
};

export const getCarryLimitMultiplier = ({
  dailyCount,
  carryLimit,
  noCollectDurations,
}: GetCarryLimitMultiplierOpts) => {
  const noCollectToFullPackDuration = getNoCollectToFullPackDuration({dailyCount, carryLimit});
  const fullPackDuration = toSum(
    noCollectDurations.map((duration) => Math.max(duration - noCollectToFullPackDuration, 0)),
  );

  return (durationOfDay - fullPackDuration) / durationOfDay;
};
