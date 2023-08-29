import {PokemonProducingRate} from '@/types/game/producing/rate';
import {getBerryProducingRate, GetBerryProducingRateOpts} from '@/utils/game/producing/berry';
import {getIngredientProducingRates, GetIngredientProducingRatesOpts} from '@/utils/game/producing/ingredients';


type GetPokemonProducingRateOpts = GetBerryProducingRateOpts & GetIngredientProducingRatesOpts & {
  ingredientBonus?: number,
};

export const getPokemonProducingRate = ({
  snorlaxFavorite,
  berryData,
  ingredientBonus,
  ...props
}: GetPokemonProducingRateOpts): PokemonProducingRate => {
  return {
    berry: getBerryProducingRate({
      snorlaxFavorite,
      berryData,
      ...props,
    }),
    ingredient: Object.fromEntries(
      getIngredientProducingRates({
        multiplier: 1 + ((ingredientBonus ?? 0) / 100),
        ...props,
      })
        .map((rate) => [rate.id, rate]),
    ),
  };
};
