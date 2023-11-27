import {defaultHelperCount, defaultProductionPeriod} from '@/const/game/production';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {
  PokemonProducingRate,
  ProducingRateImplicitParams,
  ProducingRateSingleParams,
} from '@/types/game/producing/rate';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {toSum} from '@/utils/array';
import {getMainSkillLevel} from '@/utils/game/mainSkill/level';
import {getBerryProducingRate, GetBerryProducingRateOpts} from '@/utils/game/producing/berry';
import {
  getCarryLimitInfo,
  getFullPackStats,
  getTheoreticalDailyQuantityInSleep,
} from '@/utils/game/producing/carryLimit';
import {getBaseFrequencyFromPokemon} from '@/utils/game/producing/frequency';
import {getIngredientProducingRates, GetIngredientProducingRatesOpts} from '@/utils/game/producing/ingredient/multi';
import {getMainSkillProducingRate, GetMainSkillProducingRateOpts} from '@/utils/game/producing/mainSkill';
import {getProducingRateOfStates} from '@/utils/game/producing/rateReducer';
import {getProduceSplit, getProducingSleepStateSplit} from '@/utils/game/producing/split';
import {GetProducingRateSharedOpts} from '@/utils/game/producing/type';


export type GetPokemonProducingRateBaseOpts =
  Omit<GetBerryProducingRateOpts, 'frequency'> &
  Omit<GetIngredientProducingRatesOpts, 'frequency'> &
  Omit<GetMainSkillProducingRateOpts, 'frequency' | 'skillRatePercent' | 'skillLevel' | 'timeToFullPack'> &
  ProducingRateSingleParams &
  ProducingRateImplicitParams &
  GetProducingRateSharedOpts &
  CalculatedUserSettings & {
    pokemonProducingParams: PokemonProducingParams,
  };

export const getPokemonProducingRateBase = ({
  seeds,
  evolutionCount,
  ...opts
}: GetPokemonProducingRateBaseOpts): PokemonProducingRate => {
  const {
    pokemon,
    pokemonProducingParams,
    helperCount,
    sleepDurations,
    behavior,
  } = opts;

  const period = opts.period ?? defaultProductionPeriod;
  const sleepDuration = toSum(sleepDurations);
  const subSkillBonus = opts.subSkillBonus ?? {};

  const frequency = getBaseFrequencyFromPokemon({
    ...opts,
    subSkillBonus,
    helperCount: helperCount ?? defaultHelperCount,
  });
  const carryLimitInfo = getCarryLimitInfo({
    pokemon,
    evolutionCount,
    subSkillBonus,
    behavior,
  });

  const berry = getBerryProducingRate({
    frequency,
    ...opts,
  });
  const ingredient = getIngredientProducingRates({
    frequency,
    ...opts,
  });

  const produceSplit = getProduceSplit({
    specialty: pokemon.specialty,
    ...opts,
  });
  const fullPackStats = getFullPackStats({
    carryLimit: carryLimitInfo.final,
    dailyCount: getTheoreticalDailyQuantityInSleep({
      rate: {berry, ingredient},
      produceSplit,
    }),
    sleepDurations,
  });
  const sleepStateSplit = getProducingSleepStateSplit({
    sleepDuration,
    fullPackRatioInSleep: fullPackStats.ratio,
  });
  // `skill` depends on `fullPackStats.secondsToFull`
  const skill = getMainSkillProducingRate({
    frequency,
    timeToFullPack: fullPackStats.secondsToFull,
    skillLevel: getMainSkillLevel({
      seedsUsed: seeds.gold,
      evolutionCount,
      subSkillBonus,
    }),
    skillRatePercent: behavior.includeMainSkill ? pokemonProducingParams.skillPercent : 0,
    ...opts,
  });

  return {
    period,
    fullPackStats,
    sleepStateSplit,
    carryLimitInfo,
    berry: getProducingRateOfStates({
      specialty: pokemon.specialty,
      period,
      rate: berry,
      produceType: 'berry',
      produceSplit,
      sleepStateSplit,
      ...opts,
    }),
    ingredient: Object.fromEntries(Object.values(ingredient).map((rate) => [
      rate.id,
      getProducingRateOfStates({
        specialty: pokemon.specialty,
        period,
        rate,
        produceType: 'ingredient',
        produceSplit,
        sleepStateSplit,
        ...opts,
      }),
    ])),
    skill: getProducingRateOfStates({
      specialty: pokemon.specialty,
      period,
      rate: skill,
      produceType: 'skill',
      produceSplit,
      sleepStateSplit,
      ...opts,
    }),
  };
};

