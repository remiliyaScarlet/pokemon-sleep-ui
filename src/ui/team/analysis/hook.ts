import {useFilterInput} from '@/components/input/filter/hook';
import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {PokemonId, PokemonInfo} from '@/types/mongo/pokemon';
import {TeamAnalysisFilter} from '@/ui/team/analysis/type';


type UseTeamAnalysisPokemonFilterOpts = {
  data: PokemonInfo[],
};

export const useTeamAnalysisPokemonFilter = ({data}: UseTeamAnalysisPokemonFilterOpts) => {
  return useFilterInput<TeamAnalysisFilter, PokemonInfo, PokemonId>({
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
      snorlaxFavorite: {},
    },
    isDataIncluded: (filter, data) => {
      return isPokemonIncludedFromFilter(filter, data);
    },
  });
};
