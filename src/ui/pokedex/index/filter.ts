import {Session} from 'next-auth';

import {useFilterInput} from '@/components/input/filter/hook';
import {isDataIncludingAllOfFilter, isFilterMatchingSearch} from '@/components/input/filter/utils/check';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/input/type';
import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {PokemonId} from '@/types/game/pokemon';
import {PokedexData, PokedexFilter, PokemonInfoForPokedex} from '@/ui/pokedex/index/type';
import {generateInitialFilter} from '@/ui/pokedex/index/utils';


type UseFilteredPokedexOpts = UsePokemonFilterCommonData & {
  data: PokedexData,
  session: Session | null,
};

export const useFilteredPokedex = ({data, session, ...filterData}: UseFilteredPokedexOpts) => {
  return useFilterInput<PokedexFilter, PokemonInfoForPokedex, PokemonId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: generateInitialFilter(session),
    isDataIncluded: (filter, pokemon) => {
      if (!isDataIncludingAllOfFilter({
        filter,
        filterKey: 'mapId',
        ids: pokemon.sleepStyles.map(({mapId}) => mapId),
        idInFilterToIdForCheck: Number,
        onIdsEmpty: false,
      })) {
        return false;
      }

      if (!isFilterMatchingSearch({filter, filterKey: 'name', search: pokemon.nameOfAllLocale})) {
        return false;
      }

      return isPokemonIncludedFromFilter({filter, pokemon, ...filterData});
    },
  });
};
