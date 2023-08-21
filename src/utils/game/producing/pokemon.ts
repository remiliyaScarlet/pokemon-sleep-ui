import {PokemonProducingRate} from '@/types/game/producing/rate';
import {getBerryProducingRate, GetBerryProducingRateOpts} from '@/utils/game/producing/berry';
import {getIngredientProducingRate, GetIngredientProducingRateOpts} from '@/utils/game/producing/ingredient';


type GetPokemonProducingRateOpts = GetBerryProducingRateOpts & GetIngredientProducingRateOpts;

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
    ingredient: getIngredientProducingRate(props),
  };
};
