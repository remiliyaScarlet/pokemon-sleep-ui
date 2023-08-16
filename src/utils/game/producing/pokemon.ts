import {PokemonProducingRate} from '@/types/game/producing/rate';
import {getBerryProducingRate, GetBerryProducingRateOpts} from '@/utils/game/producing/berry';
import {getIngredientProducingRate, GetIngredientProducingRateOpts} from '@/utils/game/producing/ingredient';


type GetPokemonProducingRateOpts = GetBerryProducingRateOpts & GetIngredientProducingRateOpts;

export const getPokemonProducingRate = ({
  isSnorlaxFavorite,
  berryData,
  ...props
}: GetPokemonProducingRateOpts): PokemonProducingRate => {
  return {
    berry: getBerryProducingRate({
      isSnorlaxFavorite,
      berryData,
      ...props,
    }),
    ingredient: getIngredientProducingRate(props),
  };
};
