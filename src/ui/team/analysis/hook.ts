import {useFilterInput} from '@/components/input/filter/hook';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {generatePokemonInputFilter, isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {TeamAnalysisPokemonFilter} from '@/ui/team/analysis/type';


type UseTeamAnalysisPokemonFilterOpts = UsePokemonFilterCommonData & {
  pokemonList: PokemonInfo[],
};

export const useTeamAnalysisPokemonFilter = ({
  pokemonList,
  ...filterData
}: UseTeamAnalysisPokemonFilterOpts) => {
  return useFilterInput<TeamAnalysisPokemonFilter, PokemonInfo, PokemonId>({
    data: pokemonList,
    dataToId: ({id}) => id,
    initialFilter: generatePokemonInputFilter(),
    isDataIncluded: (filter, pokemon) => {
      return isPokemonIncludedFromFilter({filter, pokemon, ...filterData});
    },
  });
};
