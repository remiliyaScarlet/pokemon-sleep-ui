import {useFilterInput} from '@/components/input/filter/hook';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/input/type';
import {generatePokemonInputFilter, isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {TeamAnalysisPokemonFilter} from '@/ui/team/analysis/type';


type UseTeamAnalysisPokemonFilterOpts = UsePokemonFilterCommonData & {
  data: PokemonInfo[],
};

export const useTeamAnalysisPokemonFilter = ({
  data,
  ...filterData
}: UseTeamAnalysisPokemonFilterOpts) => {
  return useFilterInput<TeamAnalysisPokemonFilter, PokemonInfo, PokemonId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: generatePokemonInputFilter(),
    isDataIncluded: (filter, pokemon) => {
      return isPokemonIncludedFromFilter({filter, pokemon, ...filterData});
    },
  });
};
