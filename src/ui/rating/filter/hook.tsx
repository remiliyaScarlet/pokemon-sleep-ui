import {useFilterInput} from '@/components/input/filter/hook';
import {isDataIncludingAllOfFilter} from '@/components/input/filter/utils/check';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/input/type';
import {
  generatePokemonInputFilterExtended,
  isPokemonIncludedFromFilter,
} from '@/components/shared/pokemon/input/utils';
import {PokemonId, PokemonInfoWithMap} from '@/types/game/pokemon';
import {RatingFilter} from '@/ui/rating/filter/type';


type UseRatingFilterOpts = UsePokemonFilterCommonData & {
  data: PokemonInfoWithMap[],
};

export const useRatingFilter = ({data, ...filterData}: UseRatingFilterOpts) => {
  return useFilterInput<RatingFilter, PokemonInfoWithMap, PokemonId>({
    data,
    dataToId: ({info}) => info.id,
    initialFilter: generatePokemonInputFilterExtended(),
    isDataIncluded: (filter, data) => {
      if (!isDataIncludingAllOfFilter({
        filter,
        filterKey: 'mapId',
        ids: data.mapsAvailable,
        idInFilterToIdForCheck: Number,
        onIdsEmpty: false,
      })) {
        return false;
      }

      return isPokemonIncludedFromFilter({filter, pokemon: data.info, ...filterData});
    },
  });
};
