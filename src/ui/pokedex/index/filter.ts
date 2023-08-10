import merge from 'lodash/merge';

import {useFilterInput} from '@/components/input/filter/hook';
import {isDataIncludingAllOfFilter} from '@/components/input/filter/utils/check';
import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {PokemonId} from '@/types/mongo/pokemon';
import {PokedexData, PokedexDisplay, PokedexFilter, PokemonInfoForPokedex} from '@/ui/pokedex/index/type';
import {DeepPartial} from '@/utils/type';


type UseFilteredPokedexOpts = {
  data: PokedexData,
  display: DeepPartial<PokedexDisplay> | undefined,
};

export const useFilteredPokedex = ({data, display}: UseFilteredPokedexOpts) => {
  return useFilterInput<PokedexFilter, PokemonInfoForPokedex, PokemonId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: {
      name: '',
      pokemonType: {},
      mapId: {},
      sleepType: {},
      specialty: {},
      ingredientFixed: {},
      ingredientRandom: {},
      berry: {},
      mainSkill: {},
      level: 1,
      ...merge({
        display: 'mainSkill',
        sort: 'id',
      }, display),
    },
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

      const filterName = filter.name.toUpperCase();
      if (filter.name !== '' && !data.nameOfAllLocale.some((name) => name.toUpperCase().includes(filterName))) {
        return false;
      }

      return isPokemonIncludedFromFilter(filter, data);
    },
  });
};
