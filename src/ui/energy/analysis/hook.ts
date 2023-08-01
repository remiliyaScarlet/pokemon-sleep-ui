import {useFilterInput} from '@/components/input/filter/hook';
import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {PokemonId, PokemonInfo} from '@/types/mongo/pokemon';
import {EnergyAnalysisFilter} from '@/ui/energy/analysis/type';


type UseFilteredEnergyAnalysisOpts = {
  data: PokemonInfo[],
};

export const useEnergyAnalysisPokemonFilter = ({data}: UseFilteredEnergyAnalysisOpts) => {
  return useFilterInput<EnergyAnalysisFilter, PokemonInfo, PokemonId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: {
      pokemonType: {},
      sleepType: {},
      specialty: {},
      ingredientFixed: {},
      ingredientRandom: {},
      berry: {},
      mainSkill: {},
      team: {
        A: null,
        B: null,
        C: null,
        D: null,
        E: null,
      },
      snorlaxFavorite: {},
    },
    isDataIncluded: (filter, data) => {
      return isPokemonIncludedFromFilter(filter, data);
    },
  });
};
