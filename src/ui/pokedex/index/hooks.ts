import {useFilterInput} from '@/components/input/filter/hooks';
import {
  isFilterMatchingAll,
  isFilterMatchingSome,
  isFilterMismatchOnSingle,
} from '@/components/input/filter/utils/check';
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
      type: {},
      mapId: {},
      sleepType: {},
      ingredientFixed: {},
      ingredientRandom: {},
      berryId: {},
      skill: {},
      display: 'mainSkill',
    },
    isDataIncluded: (filter, data) => {
      if (isFilterMismatchOnSingle({filter, filterKey: 'type', id: data.type})) {
        return false;
      }

      if (isFilterMismatchOnSingle({filter, filterKey: 'sleepType', id: data.sleepType})) {
        return false;
      }

      if (isFilterMismatchOnSingle({filter, filterKey: 'skill', id: data.skill})) {
        return false;
      }

      if (!isFilterMatchingAll({
        filter,
        filterKey: 'mapId',
        ids: data.sleepStyles.map(({mapId}) => mapId),
        idInFilterToIdForCheck: Number,
        onIdsEmpty: false,
      })) {
        return false;
      }

      if (isFilterMismatchOnSingle({filter, filterKey: 'ingredientFixed', id: data.ingredients.fixed})) {
        return false;
      }

      if (!isFilterMatchingSome({
        filter,
        filterKey: 'ingredientRandom',
        ids: data.ingredients.random ?? [],
      })) {
        return false;
      }

      return !isFilterMismatchOnSingle({filter, filterKey: 'berryId', id: data.berry.id});
    },
  });
};
