import {useFilterInput} from '@/components/input/filter/hook';
import {isDataIncludingAllOfFilter} from '@/components/input/filter/utils/check';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/input/type';
import {
  generatePokemonInputFilterExtended,
  isPokemonIncludedFromFilter,
} from '@/components/shared/pokemon/input/utils';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {AnalysisComparisonFilter, AnalysisFilterPokemonData} from '@/ui/analysis/page/type';
import {generateIngredientProductionAtLevels} from '@/utils/game/producing/ingredientChain';


type UseAnalysisFilterOpts = UsePokemonFilterCommonData & {
  data: AnalysisFilterPokemonData[],
  currentPokemon: PokemonInfo,
};

export const useAnalysisFilter = ({data, currentPokemon, ...filterData}: UseAnalysisFilterOpts) => {
  const {ingredientChainMap} = filterData;

  return useFilterInput<AnalysisComparisonFilter, AnalysisFilterPokemonData, PokemonId>({
    data,
    dataToId: ({info}) => info.id,
    initialFilter: {
      ...generatePokemonInputFilterExtended(),
      ingredients: generateIngredientProductionAtLevels(ingredientChainMap[currentPokemon.ingredientChain]),
    },
    isDataIncluded: (filter, data) => {
      if (!isDataIncludingAllOfFilter({
        filter,
        filterKey: 'mapId',
        ids: data.mapsAvailable,
        idInFilterToIdForCheck: Number,
        onIdsEmpty: false,
      })) {
        return false;
      }

      return isPokemonIncludedFromFilter({filter, pokemon: data.info, ...filterData});
    },
  });
};
