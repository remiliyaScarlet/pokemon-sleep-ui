import {useFilterInput} from '@/components/input/filter/hook';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/input/type';
import {generatePokemonInputFilter, isPokemonIncludedFromFilter} from '@/components/shared/pokemon/input/utils';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {RatingFilter} from '@/ui/rating/filter/type';


type UseRatingFilterOpts = UsePokemonFilterCommonData & {
  data: PokemonInfo[],
};

export const useRatingFilter = ({data, ...filterData}: UseRatingFilterOpts) => {
  return useFilterInput<RatingFilter, PokemonInfo, PokemonId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: generatePokemonInputFilter(),
    isDataIncluded: (filter, pokemon) => isPokemonIncludedFromFilter({filter, pokemon, ...filterData}),
  });
};
