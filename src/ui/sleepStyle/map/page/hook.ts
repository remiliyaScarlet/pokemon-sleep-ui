import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterConditionActive} from '@/components/input/filter/utils/check';
import {generatePokemonInputFilter, isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils';
import {SleepStyleDataFlattened} from '@/types/game/sleepStyle';
import {MapCommonProps, MapInputInclusionKey, MapPageFilter} from '@/ui/sleepStyle/map/page/type';


export const useMapFilter = ({sleepStyles, pokedexMap, ...filterData}: MapCommonProps) => {
  return useFilterInput<MapPageFilter, SleepStyleDataFlattened, MapInputInclusionKey>({
    data: sleepStyles,
    dataToId: ({pokemonId, style}) => `${pokemonId}-${style.style}`,
    initialFilter: {
      ...generatePokemonInputFilter(),
      showEmptyRank: false,
      showSleepdexStats: true,
      showLockedOnly: true,
      markingSleepdex: false,
      sleepStyle: {},
      displayType: 'sleepStyle',
    },
    isDataIncluded: (filter, data) => {
      const pokemon = pokedexMap[data.pokemonId];

      if (!pokemon) {
        return false;
      }

      if (isFilterConditionActive({filter, filterKey: 'sleepStyle'}) && !filter.sleepStyle[data.style.style]) {
        return false;
      }

      return isPokemonIncludedFromFilter({filter, pokemon, ...filterData});
    },
    deps: [pokedexMap],
  });
};
