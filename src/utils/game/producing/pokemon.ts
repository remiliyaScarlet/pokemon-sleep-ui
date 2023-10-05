import {defaultHelperCount, defaultProducingParams} from '@/const/game/production';
import {PokemonId} from '@/types/game/pokemon';
import {PokemonProducingParams, PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {ProductionPeriod} from '@/types/game/producing/display';
import {PokemonProducingRate, ProducingRateSingleParams} from '@/types/game/producing/rate';
import {toSum} from '@/utils/array';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon';
import {getBerryProducingRate, GetBerryProducingRateOpts} from '@/utils/game/producing/berry';
import {
  getCarryLimitInfo,
  getFullPackStats,
  getTheoreticalDailyQuantityInSleep,
} from '@/utils/game/producing/carryLimit';
import {getBaseFrequencyFromPokemon} from '@/utils/game/producing/frequency';
import {getIngredientProducingRates, GetIngredientProducingRatesOpts} from '@/utils/game/producing/ingredients';
import {getTotalItemRateOfSessions} from '@/utils/game/producing/rateReducer';
import {getProduceSplit} from '@/utils/game/producing/split';


type GetPokemonProducingRateOpts =
  Omit<GetBerryProducingRateOpts, 'frequency'> &
  Omit<GetIngredientProducingRatesOpts, 'frequency'> &
  ProducingRateSingleParams & {
    pokemonProducingParams: PokemonProducingParams,
    period?: ProductionPeriod,
    evolutionCount?: number,
    sleepDurations: number[],
  };

export const getPokemonProducingRate = ({
  evolutionCount,
  sleepDurations,
  ...opts
}: GetPokemonProducingRateOpts): PokemonProducingRate => {
  const {pokemon, helperCount} = opts;

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
    evolutionCount: evolutionCount ?? getEvolutionCountFromPokemonInfo({pokemon}),
    subSkillBonus,
  });

  const berry = getBerryProducingRate({
    frequency,
    ...opts,
  });
  const ingredient = getIngredientProducingRates({
    frequency,
    ...opts,
  });

  const produceSplit = getProduceSplit(opts);
  const fullPackStats = getFullPackStats({
    carryLimit: carryLimitInfo.final,
    dailyCount: getTheoreticalDailyQuantityInSleep({
      rate: {berry, ingredient},
      produceSplit,
    }),
    sleepDurations: sleepDurations,
  });

  return {
    fullPackStats,
    carryLimitInfo,
    berry: getTotalItemRateOfSessions({
      period,
      rate: berry,
      produceType: 'berry',
      produceSplit,
      sleepDuration,
      fullPackRatioInSleep: fullPackStats.ratio,
      ...opts,
    }),
    ingredient: Object.fromEntries(Object.values(ingredient).map((rate) => [
      rate.id,
      getTotalItemRateOfSessions({
        period,
        rate,
        produceType: 'ingredient',
        produceSplit,
        sleepDuration,
        fullPackRatioInSleep: fullPackStats.ratio,
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
