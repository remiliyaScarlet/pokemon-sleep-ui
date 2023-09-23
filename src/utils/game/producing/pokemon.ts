import {defaultProducingParams} from '@/const/game/production';
import {PokemonId} from '@/types/game/pokemon';
import {PokemonProducingParams, PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {PokemonProducingRate} from '@/types/game/producing/rate';
import {toSum} from '@/utils/array';
import {getBerryProducingRate, GetBerryProducingRateOpts} from '@/utils/game/producing/berry';
import {getCarryLimitFromPokemonInfo, getCarryLimitMultiplier} from '@/utils/game/producing/carryLimit';
import {getIngredientProducingRates, GetIngredientProducingRatesOpts} from '@/utils/game/producing/ingredients';
import {getTotalRateOfItemOfSessions} from '@/utils/game/producing/utils';


type GetPokemonProducingRateOpts = GetBerryProducingRateOpts & GetIngredientProducingRatesOpts & {
  carryLimit?: number,
  sleepDurations: number[],
};

export const getPokemonProducingRate = ({
  carryLimit,
  sleepDurations,
  ...opts
}: GetPokemonProducingRateOpts): PokemonProducingRate => {
  const {pokemon} = opts;
  const sleepDuration = toSum(sleepDurations);

  const berry = getBerryProducingRate(opts);
  const ingredient = Object.fromEntries(getIngredientProducingRates(opts).map((rate) => [
    rate.id,
    rate,
  ]));

  const dailyCountDuringSleep = (
    berry.sleep.quantity +
    toSum(Object.values(ingredient).map(({sleep}) => sleep.quantity))
  );

  const carryLimitMultiplier = getCarryLimitMultiplier({
    carryLimit: carryLimit ?? getCarryLimitFromPokemonInfo({pokemon}),
    dailyCount: dailyCountDuringSleep,
    sleepDurations: sleepDurations,
  });

  return {
    berry: getTotalRateOfItemOfSessions({
      rate: berry,
      sleepDuration,
    }),
    ingredient: Object.fromEntries(Object.values(ingredient).map((rate) => [
      rate.id,
      getTotalRateOfItemOfSessions({rate, carryLimitMultiplier, sleepDuration}),
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
