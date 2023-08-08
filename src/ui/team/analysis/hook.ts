import {useFilterInput} from '@/components/input/filter/hook';
import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {PokemonId, PokemonInfo} from '@/types/mongo/pokemon';
import {SnorlaxFavorite, TeamAnalysisFilter} from '@/ui/team/analysis/type';


type UseTeamAnalysisPokemonFilterOpts = {
  data: PokemonInfo[],
  snorlaxFavorite: SnorlaxFavorite | undefined,
};

export const useTeamAnalysisPokemonFilter = ({data, snorlaxFavorite}: UseTeamAnalysisPokemonFilterOpts) => {
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
      snorlaxFavorite: snorlaxFavorite ?? {},
    },
    isDataIncluded: (filter, data) => {
      return isPokemonIncludedFromFilter(filter, data);
    },
  });
};
