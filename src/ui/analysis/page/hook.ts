import {useFilterInput} from '@/components/input/filter/hook';
import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {PokemonId, PokemonInfo} from '@/types/mongo/pokemon';
import {AnalysisComparisonFilter} from '@/ui/analysis/page/type';


type UseAnalysisFilterOpts = {
  data: PokemonInfo[],
};

export const useAnalysisFilter = ({data}: UseAnalysisFilterOpts) => {
  return useFilterInput<AnalysisComparisonFilter, PokemonInfo, PokemonId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: {
      pokemonType: {},
      sleepType: {},
      specialty: {},
      ingredientFixed: {},
      ingredientRandom: {},
      berry: {},
      mainSkill: {},
      level: 1,
    },
    isDataIncluded: (filter, data) => {
      return isPokemonIncludedFromFilter(filter, data);
    },
  });
};
