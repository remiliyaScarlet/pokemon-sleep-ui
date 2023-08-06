import {PokemonInputFilter} from '@/components/shared/pokemon/input/type';
import {BerryDataMap} from '@/types/mongo/berry';
import {IngredientMap} from '@/types/mongo/ingredient';
import {PokemonInfo} from '@/types/mongo/pokemon';


export type AnalysisComparisonFilter = PokemonInputFilter & {
  level: number,
};

export type AnalysisPageCommonProps = {
  pokedex: PokemonInfo[],
  pokemon: PokemonInfo,
  ingredientMap: IngredientMap,
  berryDataMap: BerryDataMap,
};
