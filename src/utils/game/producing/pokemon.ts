import {PokemonProducingRate} from '@/types/game/producing/rate';
import {getBerryProducingRate, GetBerryProducingRateOpts} from '@/utils/game/producing/berry';
import {getIngredientProducingRates, GetIngredientProducingRatesOpts} from '@/utils/game/producing/ingredients';


type GetPokemonProducingRateOpts = GetBerryProducingRateOpts & GetIngredientProducingRatesOpts;

export const getPokemonProducingRate = ({
  snorlaxFavorite,
  berryData,
  ...opts
}: GetPokemonProducingRateOpts): PokemonProducingRate => {
  return {
    berry: getBerryProducingRate({
      snorlaxFavorite,
      berryData,
      ...opts,
    }),
    ingredient: Object.fromEntries(getIngredientProducingRates(opts).map((rate) => [rate.id, rate])),
  };
};
