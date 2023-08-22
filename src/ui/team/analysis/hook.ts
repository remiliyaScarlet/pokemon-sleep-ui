import {useFilterInput} from '@/components/input/filter/hook';
import {generatePokemonInputFilter, isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {TeamAnalysisFilter} from '@/ui/team/analysis/type';


type UseTeamAnalysisPokemonFilterOpts = {
  data: PokemonInfo[],
  snorlaxFavorite: SnorlaxFavorite | undefined,
};

export const useTeamAnalysisPokemonFilter = ({data, snorlaxFavorite}: UseTeamAnalysisPokemonFilterOpts) => {
  return useFilterInput<TeamAnalysisFilter, PokemonInfo, PokemonId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: {
      ...generatePokemonInputFilter(),
      snorlaxFavorite: snorlaxFavorite ?? {},
    },
    isDataIncluded: (filter, data) => {
      return isPokemonIncludedFromFilter(filter, data);
    },
  });
};
