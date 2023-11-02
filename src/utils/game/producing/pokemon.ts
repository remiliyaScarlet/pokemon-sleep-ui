import {defaultHelperCount, defaultProducingParams} from '@/const/game/production';
import {PokemonId} from '@/types/game/pokemon';
import {PokemonProducingParams, PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {ProductionPeriod} from '@/types/game/producing/display';
import {PokemonProducingRate, ProducingRateSingleParams} from '@/types/game/producing/rate';
import {UserCalculationBehavior} from '@/types/userData/settings';
import {toSum} from '@/utils/array';
import {getBerryProducingRate, GetBerryProducingRateOpts} from '@/utils/game/producing/berry';
import {
  getCarryLimitInfo,
  getFullPackStats,
  getTheoreticalDailyQuantityInSleep,
} from '@/utils/game/producing/carryLimit';
import {getBaseFrequencyFromPokemon} from '@/utils/game/producing/frequency';
import {getIngredientProducingRates, GetIngredientProducingRatesOpts} from '@/utils/game/producing/ingredients';
import {getProducingRateOfStates} from '@/utils/game/producing/rateReducer';
import {getProduceSplit, getProducingSleepStateSplit} from '@/utils/game/producing/split';


type GetPokemonProducingRateOpts =
  Omit<GetBerryProducingRateOpts, 'frequency'> &
  Omit<GetIngredientProducingRatesOpts, 'frequency'> &
  ProducingRateSingleParams & {
    pokemonProducingParams: PokemonProducingParams,
    sleepDurations: number[],
    evolutionCount: number,
    behavior: UserCalculationBehavior,
    period?: ProductionPeriod,
    noCap?: boolean,
  };

export const getPokemonProducingRate = ({
  sleepDurations,
  evolutionCount,
  ...opts
}: GetPokemonProducingRateOpts): PokemonProducingRate => {
  const {pokemon, helperCount, behavior} = opts;

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
    sleepDurations: sleepDurations,
  });
  const sleepStateSplit = getProducingSleepStateSplit({
    sleepDuration,
    fullPackRatioInSleep: fullPackStats.ratio,
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
  };
};

type GetPokemonProducingParamsOpts = {
  pokemonId: PokemonId,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
};

export const getPokemonProducingParams = ({
  pokemonId,
  pokemonProducingParamsMap,
}: GetPokemonProducingParamsOpts): PokemonProducingParams => {
  return pokemonProducingParamsMap[pokemonId] ?? {pokemonId, ...defaultProducingParams};
};
