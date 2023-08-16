import {getPokemonSorter, GetPokemonSorterOpts, sortPokemon} from '@/components/shared/pokemon/sorter/calc';
import {
  PokemonInfoWithSortingPayload,
  PokemonSortType,
  SortedPokemonInfo,
} from '@/components/shared/pokemon/sorter/type';
import {GetProducingRateChangeableOpts} from '@/utils/game/producing/type';


export type GetSortedPokemonOpts<TExtra, TData extends PokemonInfoWithSortingPayload<TExtra>> = Pick<
  GetPokemonSorterOpts,
  'ingredientMap' | 'berryMap' | keyof GetProducingRateChangeableOpts
> & {
  data: TData[],
  sort: PokemonSortType,
};

export const getSortedPokemon = <TExtra, TData extends PokemonInfoWithSortingPayload<TExtra>>({
  data,
  sort,
  ...opts
}: GetSortedPokemonOpts<TExtra, TData>): SortedPokemonInfo<TExtra, TData>[] => {
  return data
    .map<SortedPokemonInfo<TExtra, TData>>((data) => {
      return {
        sorter: getPokemonSorter({
          type: sort,
          level: data.level,
          pokemon: data.pokemon,
          ...opts,
        }),
        source: data,
      };
    })
    .sort(sortPokemon(sort));
};
