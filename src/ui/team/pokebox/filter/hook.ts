import {useFilterInput} from '@/components/input/filter/hook';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {generatePokemonInputFilter, isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {PokeboxPickerFilter} from '@/ui/team/pokebox/filter/type';


type UsePokeboxPickerFilterOpts = UsePokemonFilterCommonData & {
  data: PokemonInfo[],
};

export const usePokeboxPickerFilter = ({data, ...filterData}: UsePokeboxPickerFilterOpts) => {
  return useFilterInput<PokeboxPickerFilter, PokemonInfo, PokemonId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: {
      ...generatePokemonInputFilter({isLevelAgnostic: false}),
    },
    isDataIncluded: (filter, pokemon) => {
      return isPokemonIncludedFromFilter({filter, pokemon, ...filterData});
    },
  });
};
