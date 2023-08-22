import {Session} from 'next-auth';

import {useFilterInput} from '@/components/input/filter/hook';
import {isDataIncludingAllOfFilter, isFilterMatchingSearch} from '@/components/input/filter/utils/check';
import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {PokemonId} from '@/types/game/pokemon';
import {PokedexData, PokedexFilter, PokemonInfoForPokedex} from '@/ui/pokedex/index/type';
import {generateInitialFilter} from '@/ui/pokedex/index/utils';


type UseFilteredPokedexOpts = {
  data: PokedexData,
  session: Session | null,
};

export const useFilteredPokedex = ({data, session}: UseFilteredPokedexOpts) => {
  return useFilterInput<PokedexFilter, PokemonInfoForPokedex, PokemonId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: generateInitialFilter(session),
    isDataIncluded: (filter, data) => {
      if (!isDataIncludingAllOfFilter({
        filter,
        filterKey: 'mapId',
        ids: data.sleepStyles.map(({mapId}) => mapId),
        idInFilterToIdForCheck: Number,
        onIdsEmpty: false,
      })) {
        return false;
      }

      if (!isFilterMatchingSearch({filter, filterKey: 'name', search: data.nameOfAllLocale})) {
        return false;
      }

      return isPokemonIncludedFromFilter(filter, data);
    },
  });
};
