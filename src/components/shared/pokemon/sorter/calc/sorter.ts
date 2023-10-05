import {PokemonSorterGetterOpts} from '@/components/shared/pokemon/sorter/type';
import {PokemonProducingRate, ProducingRateOfStates, ProducingValueOfStates} from '@/types/game/producing/rate';
import {toSum} from '@/utils/array';
import {getPokemonProducingRate} from '@/utils/game/producing/pokemon';
import {KeysOfType} from '@/utils/type';


export const getPokemonRateSorter = ({
  berryData,
  snorlaxFavorite,
  calculatedSettings,
  ...opts
}: PokemonSorterGetterOpts): PokemonProducingRate => {
  return getPokemonProducingRate({
    ...opts,
    ...calculatedSettings,
    snorlaxFavorite,
    berryData,
  });
};

type GetPokemonItemRateSorterOpts = {
  key: KeysOfType<ProducingRateOfStates, ProducingValueOfStates>,
  opts: PokemonSorterGetterOpts,
};

export const getBerryRateSorter = ({key, opts}: GetPokemonItemRateSorterOpts): number => {
  const rateOfPokemon = getPokemonRateSorter(opts);

  return rateOfPokemon.berry[key].equivalent;
};

export const getIngredientTotalRateSorter = ({key, opts}: GetPokemonItemRateSorterOpts): number => {
  const rateOfPokemon = getPokemonRateSorter(opts);

  return toSum(Object.values(rateOfPokemon.ingredient).map((rate) => rate[key].equivalent));
};

export const getIngredientFirstRateSorter = ({key, opts}: GetPokemonItemRateSorterOpts): number => {
  const rateOfPokemon = getPokemonRateSorter(opts);

  const first = Object.values(rateOfPokemon.ingredient).at(0);
  if (!first) {
    return NaN;
  }

  return first[key].equivalent;
};
