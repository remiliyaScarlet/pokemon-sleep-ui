import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterMatchingSearch} from '@/components/input/filter/utils/check';
import {PokeboxImporterFilter, PokeInBoxForFilter} from '@/components/shared/pokebox/importer/type';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/input/type';
import {generatePokemonInputFilter, isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';


type UseFilteredPokeboxImporterOpts = UsePokemonFilterCommonData & {
  data: PokeInBoxForFilter[],
};

export const useFilteredPokeboxImporter = ({
  data,
  ...filterData
}: UseFilteredPokeboxImporterOpts) => {
  return useFilterInput<PokeboxImporterFilter, PokeInBoxForFilter, string>({
    data,
    dataToId: ({uuid}) => uuid,
    initialFilter: {
      ...generatePokemonInputFilter(),
      name: '',
    },
    isDataIncluded: (filter, {search, pokemon}) => {
      if (!isFilterMatchingSearch({filter, filterKey: 'name', search})) {
        return false;
      }

      return isPokemonIncludedFromFilter({filter, pokemon, ...filterData});
    },
  });
};
