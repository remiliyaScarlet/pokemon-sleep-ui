import {defaultHelperCount} from '@/const/game/production';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {ProductionPeriod} from '@/types/game/producing/display';
import {
  PokemonProducingRate,
  ProducingRateImplicitParams,
  ProducingRateSingleParams,
} from '@/types/game/producing/rate';
import {UserCalculationBehavior} from '@/types/userData/settings';
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


type GetPokemonProducingRateOpts =
  Omit<GetBerryProducingRateOpts, 'frequency'> &
  Omit<GetIngredientProducingRatesOpts, 'frequency'> &
  Omit<GetMainSkillProducingRateOpts, 'frequency' | 'skillRatePercent' | 'skillLevel' | 'timeToFullPack'> &
  ProducingRateSingleParams &
  ProducingRateImplicitParams & {
    pokemonProducingParams: PokemonProducingParams,
    behavior: UserCalculationBehavior,
    period?: ProductionPeriod,
    noCap?: boolean,
  };

export const getPokemonProducingRate = ({
  sleepDurations,
  seeds,
  evolutionCount,
  ...opts
}: GetPokemonProducingRateOpts): PokemonProducingRate => {
  const {
    pokemon,
    pokemonProducingParams,
    helperCount,
    behavior,
  } = opts;

  const period = opts.period ?? 'daily';
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
    sleepDurations,
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

