import {useFilterInput} from '@/components/input/filter/hook';
import {isDataIncludingAllOfFilter} from '@/components/input/filter/utils/check';
import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {PokemonId} from '@/types/mongo/pokemon';
import {PokedexData, PokedexFilter, PokedexSinglePokemon} from '@/ui/pokedex/index/type';


type UseFilteredPokedexOpts = {
  data: PokedexData,
};

export const useFilteredPokedex = ({data}: UseFilteredPokedexOpts) => {
  return useFilterInput<PokedexFilter, PokedexSinglePokemon, PokemonId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: {
      pokemonType: {},
      mapId: {},
      sleepType: {},
      specialty: {},
      ingredientFixed: {},
      ingredientRandom: {},
      berry: {},
      mainSkill: {},
      level: 1,
      display: 'mainSkill',
      sort: 'id',
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

      return isPokemonIncludedFromFilter(filter, data);
    },
  });
};
