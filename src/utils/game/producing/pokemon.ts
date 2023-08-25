import {PokemonProducingRate} from '@/types/game/producing/rate';
import {getBerryProducingRate, GetBerryProducingRateOpts} from '@/utils/game/producing/berry';
import {getIngredientProducingRates, GetIngredientProducingRatesOpts} from '@/utils/game/producing/ingredients';


type GetPokemonProducingRateOpts = GetBerryProducingRateOpts & GetIngredientProducingRatesOpts;

export const getPokemonProducingRate = ({
  snorlaxFavorite,
  berryData,
  ...props
}: GetPokemonProducingRateOpts): PokemonProducingRate => {
  return {
    berry: getBerryProducingRate({
      snorlaxFavorite: snorlaxFavorite,
      berryData,
      ...props,
    }),
    ingredient: Object.fromEntries(
      getIngredientProducingRates(props).map((rate) => [rate.id, rate]),
    ),
  };
};
