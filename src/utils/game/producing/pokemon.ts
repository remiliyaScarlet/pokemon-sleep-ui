import {defaultProducingParams} from '@/const/game/production';
import {PokemonId} from '@/types/game/pokemon';
import {PokemonProducingParams, PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {PokemonProducingRate} from '@/types/game/producing/rate';
import {getBerryProducingRate, GetBerryProducingRateOpts} from '@/utils/game/producing/berry';
import {applyCarryLimit} from '@/utils/game/producing/carryLimit';
import {getIngredientProducingRates, GetIngredientProducingRatesOpts} from '@/utils/game/producing/ingredients';


type GetPokemonProducingRateOpts = GetBerryProducingRateOpts & GetIngredientProducingRatesOpts & {
  carryLimit: number,
  noCollectDurations: number[],
};

export const getPokemonProducingRate = (opts: GetPokemonProducingRateOpts): PokemonProducingRate => {
  return applyCarryLimit({
    ...opts,
    rate: {
      berry: getBerryProducingRate(opts),
      ingredient: Object.fromEntries(getIngredientProducingRates(opts).map((rate) => [rate.id, rate])),
    },
  });
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
