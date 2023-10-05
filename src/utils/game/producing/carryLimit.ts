import {durationOfDay} from '@/const/common';
import {PokemonInfo} from '@/types/game/pokemon';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {CarryLimitInfo, FullPackStats} from '@/types/game/producing/carryLimit';
import {ProducingRateOfItemOfSessions} from '@/types/game/producing/rate';
import {ProduceSplit} from '@/types/game/producing/split';
import {toSum} from '@/utils/array';
import {toProducingRateOfPeriod} from '@/utils/game/producing/convert';
import {getSubSkillBonusValue} from '@/utils/game/subSkill';


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

type GetCarryLimitInfoOpts = {
  pokemon: PokemonInfo,
  evolutionCount: number,
  subSkillBonus: GroupedSubSkillBonus,
};

export const getCarryLimitInfo = ({pokemon, evolutionCount, subSkillBonus}: GetCarryLimitInfoOpts): CarryLimitInfo => {
  const {stats} = pokemon;

  const base = stats.maxCarry + evolutionCount * 5;
  const final = base + toSum(getSubSkillBonusValue(subSkillBonus, 'inventory'));

  return {base, final};
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

  const berryDailyQuantity = (
    produceSplit.berry *
    toProducingRateOfPeriod({rate: berry.sleep, period: 'daily'}).quantity
  );
  const ingredientDailyQuantity = (
    produceSplit.ingredient *
    toSum(Object.values(ingredient)
      .map(({sleep}) => toProducingRateOfPeriod({rate: sleep, period: 'daily'}).quantity))
  );

  return berryDailyQuantity + ingredientDailyQuantity;
};
