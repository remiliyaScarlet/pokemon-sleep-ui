import {
  PokemonInfoWithSortingPayload,
  PokemonSorterGetter,
  PokemonSorterGetterOpts,
  PokemonSortType,
  SortedPokemonInfo,
} from '@/components/shared/pokemon/sorter/type';
import {ProducingRate} from '@/types/game/producing/rate';
import {BerryDataMap} from '@/types/game/berry';
import {toSum} from '@/utils/array';
import {getBerryProducingRate} from '@/utils/game/producing/berry';
import {getIngredientProducingRates} from '@/utils/game/producing/ingredients';


const getBerryRateSorter = (
  key: keyof ProducingRate,
  {berryData, snorlaxFavorite, ...opts}: PokemonSorterGetterOpts,
) => {
  if (!berryData) {
    return 0;
  }

  return getBerryProducingRate({
    snorlaxFavorite,
    berryData,
    ...opts,
  })[key];
};

const sortInAsc: PokemonSortType[] = [
  'id',
  'frequency',
  'friendshipPoint',
];

const pokemonSorterGetterBySortType: {[type in PokemonSortType]: PokemonSorterGetter} = {
  id: ({pokemon}) => pokemon.id,
  ingredientEnergy: (opts) => toSum(getIngredientProducingRates(opts).map(({dailyEnergy}) => dailyEnergy)),
  ingredientCount: (opts) => toSum(getIngredientProducingRates(opts).map(({quantity}) => quantity)),
  berryEnergy: (opts) => getBerryRateSorter('dailyEnergy', opts),
  berryCount: (opts) => getBerryRateSorter('quantity', opts),
  friendshipPoint: ({pokemon}) => pokemon.stats.friendshipPoints,
  frequency: ({pokemon}) => pokemon.stats.frequency,
  totalEnergy: (opts) => {
    const berry = getBerryRateSorter('dailyEnergy', opts);
    const ingredient = toSum(getIngredientProducingRates(opts).map(({dailyEnergy}) => dailyEnergy));

    return berry + (ingredient ?? 0);
  },
};

export type GetPokemonSorterOpts = Omit<PokemonSorterGetterOpts, 'berryData'> & {
  type: PokemonSortType,
  berryMap: BerryDataMap,
};

export const getPokemonSorter = ({
  type,
  pokemon,
  berryMap,
  ...opts
}: GetPokemonSorterOpts): number => {
  return pokemonSorterGetterBySortType[type]({
    pokemon,
    berryData: berryMap[pokemon.berry.id],
    ...opts,
  });
};

export const sortPokemon = <TExtra, TSource extends PokemonInfoWithSortingPayload<TExtra>>(
  type: PokemonSortType,
) => (
  a: SortedPokemonInfo<TExtra, TSource>, b: SortedPokemonInfo<TExtra, TSource>,
) => {
  let comparer = a.sorter - b.sorter;

  if (comparer !== 0 && !sortInAsc.some((basis) => type === basis)) {
    comparer *= -1;
  }

  if (comparer !== 0) {
    return comparer;
  }

  return a.source.pokemon.id - b.source.pokemon.id;
};
