import {useFilterInput} from '@/components/input/filter/hook';
import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {PokemonId, PokemonInfo} from '@/types/mongo/pokemon';
import {AnalysisIndexFilter} from '@/ui/analysis/index/type';


type UseAnalysisIndexFilterOpts = {
  data: PokemonInfo[],
};

export const useAnalysisIndexFilter = ({data}: UseAnalysisIndexFilterOpts) => {
  return useFilterInput<AnalysisIndexFilter, PokemonInfo, PokemonId>({
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
    },
    isDataIncluded: (filter, data) => {
      return isPokemonIncludedFromFilter(filter, data);
    },
  });
};
