import {useFilterInput} from '@/components/input/filter/hook';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {generatePokemonInputFilter, isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils';
import {PokemonComplexFilter} from '@/components/shared/pokemon/predefined/complexPicker/type';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';


type UsePokemonComplexPickerFilterOpts = UsePokemonFilterCommonData & {
  data: PokemonInfo[],
};

export const usePokemonComplexPickerFilter = ({data, ...filterData}: UsePokemonComplexPickerFilterOpts) => {
  return useFilterInput<PokemonComplexFilter, PokemonInfo, PokemonId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: generatePokemonInputFilter(),
    isDataIncluded: (filter, pokemon) => isPokemonIncludedFromFilter({filter, pokemon, ...filterData}),
  });
};
