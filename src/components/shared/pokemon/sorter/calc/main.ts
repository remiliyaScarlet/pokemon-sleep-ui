import {pokemonSorterGetterBySortType, sortInAsc} from '@/components/shared/pokemon/sorter/calc/const';
import {
  PokemonInfoWithSortingPayload,
  PokemonSorterGetterOpts,
  PokemonSortType,
  SortedPokemonInfo,
} from '@/components/shared/pokemon/sorter/type';
import {BerryDataMap} from '@/types/game/berry';


export type GetPokemonSorterOpts = Omit<PokemonSorterGetterOpts, 'berryData'> & {
  type: PokemonSortType,
  berryDataMap: BerryDataMap,
};

export const getPokemonSorter = ({
  type,
  pokemon,
  berryDataMap,
  ...opts
}: GetPokemonSorterOpts): number => {
  return pokemonSorterGetterBySortType[type]({
    pokemon,
    berryData: berryDataMap[pokemon.berry.id],
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
