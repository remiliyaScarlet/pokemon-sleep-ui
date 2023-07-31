import {useFilterInput} from '@/components/input/filter/hooks';
import {isFilterConditionActive} from '@/components/input/filter/utils/check';
import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {SleepStyleDataFlattened} from '@/types/mongo/sleepStyle';
import {MapCommonProps, MapInputInclusionKey, MapPageFilter} from '@/ui/map/page/type';


export const useMapFilter = ({sleepStyles, pokedexMap}: MapCommonProps) => {
  return useFilterInput<MapPageFilter, SleepStyleDataFlattened, MapInputInclusionKey>({
    data: sleepStyles,
    dataToId: ({pokemonId, style}) => `${pokemonId}-${style.style}`,
    initialFilter: {
      pokemonType: {},
      sleepType: {},
      ingredientFixed: {},
      ingredientRandom: {},
      berry: {},
      mainSkill: {},
      showEmptyRank: false,
      sleepStyle: {},
    },
    isDataIncluded: (filter, data) => {
      const pokemon = pokedexMap[data.pokemonId];

      if (!pokemon) {
        return false;
      }

      if (isFilterConditionActive({filter, filterKey: 'sleepStyle'}) && !filter.sleepStyle[data.style.style]) {
        return false;
      }

      return isPokemonIncludedFromFilter(filter, pokemon);
    },
    deps: [pokedexMap],
  });
};
