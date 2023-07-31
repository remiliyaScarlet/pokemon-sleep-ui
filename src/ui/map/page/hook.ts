import {useFilterInput} from '@/components/input/filter/hooks';
import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {PokemonId} from '@/types/mongo/pokemon';
import {SleepStyleData} from '@/types/mongo/sleepStyle';
import {MapCommonProps, MapPageFilter} from '@/ui/map/page/type';


export const useMapFilter = ({sleepStyles, pokedexMap}: MapCommonProps) => {
  return useFilterInput<MapPageFilter, SleepStyleData, PokemonId>({
    data: sleepStyles,
    dataToId: ({pokemonId}) => pokemonId,
    initialFilter: {
      pokemonType: {},
      sleepType: {},
      ingredientFixed: {},
      ingredientRandom: {},
      berry: {},
      mainSkill: {},
      showEmptyRank: false,
    },
    isDataIncluded: (filter, data) => {
      const pokemon = pokedexMap[data.pokemonId];

      if (!pokemon) {
        return false;
      }

      return isPokemonIncludedFromFilter(filter, pokemon);
    },
    deps: [pokedexMap],
  });
};
