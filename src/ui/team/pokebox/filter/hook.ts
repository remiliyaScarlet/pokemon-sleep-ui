import {useFilterInput} from '@/components/input/filter/hook';
import {generatePokemonInputFilter, isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {PokemonId, PokemonInfo} from '@/types/mongo/pokemon';
import {PokeboxPickerFilter} from '@/ui/team/pokebox/filter/type';


type UsePokeboxPickerFilterOpts = {
  data: PokemonInfo[],
};

export const usePokeboxPickerFilter = ({data}: UsePokeboxPickerFilterOpts) => {
  return useFilterInput<PokeboxPickerFilter, PokemonInfo, PokemonId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: {
      ...generatePokemonInputFilter(),
    },
    isDataIncluded: (filter, data) => {
      return isPokemonIncludedFromFilter(filter, data);
    },
  });
};
