import {useFilterInput} from '@/components/input/filter/hook';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/input/type';
import {generatePokemonInputFilter, isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamAnalysisFilter} from '@/ui/team/analysis/type';


type UseTeamAnalysisPokemonFilterOpts = UsePokemonFilterCommonData & {
  data: PokemonInfo[],
  snorlaxFavorite: SnorlaxFavorite | undefined,
};

export const useTeamAnalysisPokemonFilter = ({
  data,
  snorlaxFavorite,
  ...filterData
}: UseTeamAnalysisPokemonFilterOpts) => {
  return useFilterInput<TeamAnalysisFilter, PokemonInfo, PokemonId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: {
      ...generatePokemonInputFilter(),
      snorlaxFavorite: snorlaxFavorite ?? {},
    },
    isDataIncluded: (filter, pokemon) => {
      return isPokemonIncludedFromFilter({filter, pokemon, ...filterData});
    },
  });
};
