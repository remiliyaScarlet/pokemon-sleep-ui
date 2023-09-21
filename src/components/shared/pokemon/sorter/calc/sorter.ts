import {PokemonSorterGetterOpts} from '@/components/shared/pokemon/sorter/type';
import {PokemonProducingRate, ProducingRateOfItem} from '@/types/game/producing/rate';
import {toSum} from '@/utils/array';
import {getPokemonProducingRate} from '@/utils/game/producing/pokemon';


export const getPokemonRateSorter = ({
  berryData,
  snorlaxFavorite,
  calculatedSettings,
  ...opts
}: PokemonSorterGetterOpts): PokemonProducingRate | null => {
  return getPokemonProducingRate({
    ...opts,
    ...calculatedSettings,
    snorlaxFavorite,
    berryData,
  });
};

type GetPokemonItemRateSorterOpts = {
  key: keyof ProducingRateOfItem,
  opts: PokemonSorterGetterOpts,
};

export const getBerryRateSorter = ({key, opts}: GetPokemonItemRateSorterOpts): number => {
  const rateOfPokemon = getPokemonRateSorter(opts);

  if (!rateOfPokemon) {
    return 0;
  }

  return rateOfPokemon.berry[key];
};

export const getIngredientTotalRateSorter = ({key, opts}: GetPokemonItemRateSorterOpts): number => {
  const rateOfPokemon = getPokemonRateSorter(opts);

  if (!rateOfPokemon) {
    return 0;
  }

  return toSum(Object.values(rateOfPokemon.ingredient).map((rate) => rate[key]));
};

export const getIngredientFirstRateSorter = ({key, opts}: GetPokemonItemRateSorterOpts): number => {
  const rateOfPokemon = getPokemonRateSorter(opts);

  if (!rateOfPokemon) {
    return 0;
  }

  const first = Object.values(rateOfPokemon.ingredient).at(0);
  if (!first) {
    return NaN;
  }

  return first[key];
};
