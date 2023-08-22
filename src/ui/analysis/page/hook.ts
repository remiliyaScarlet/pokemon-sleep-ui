import {useFilterInput} from '@/components/input/filter/hook';
import {isDataIncludingAllOfFilter} from '@/components/input/filter/utils/check';
import {generatePokemonInputFilter, isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {PokemonId} from '@/types/game/pokemon';
import {AnalysisComparisonFilter, AnalysisFilterPokemonData} from '@/ui/analysis/page/type';


type UseAnalysisFilterOpts = {
  data: AnalysisFilterPokemonData[],
};

export const useAnalysisFilter = ({data}: UseAnalysisFilterOpts) => {
  return useFilterInput<AnalysisComparisonFilter, AnalysisFilterPokemonData, PokemonId>({
    data,
    dataToId: ({info}) => info.id,
    initialFilter: {
      ...generatePokemonInputFilter(),
      level: 1,
      mapId: {},
      snorlaxFavorite: {},
    },
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

      return isPokemonIncludedFromFilter(filter, data.info);
    },
  });
};
