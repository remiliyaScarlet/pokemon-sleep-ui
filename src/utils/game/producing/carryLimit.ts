import {durationOfDay} from '@/const/common';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProducingRate} from '@/types/game/producing/rate';
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

type ApplyCarryLimitOpts = {
  rate: PokemonProducingRate,
  carryLimit: number,
  noCollectDurations: number[],
};

export const applyCarryLimit = ({rate, ...opts}: ApplyCarryLimitOpts): PokemonProducingRate => {
  const {berry, ingredient} = rate;
  const ingredientRates = Object.values(ingredient);

  const dailyCount = berry.quantity + toSum(ingredientRates.map(({quantity}) => quantity));
  const multiplier = getCarryLimitMultiplier({dailyCount, ...opts});

  return {
    berry,
    ingredient: Object.fromEntries(ingredientRates.map(({id, quantity, dailyEnergy, frequency}) => [
      id,
      {
        id,
        frequency,
        dailyEnergy: dailyEnergy * multiplier,
        quantity: quantity * multiplier,
      },
    ])),
  };
};
