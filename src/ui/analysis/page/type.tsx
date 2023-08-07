import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonInputFilter} from '@/components/shared/pokemon/input/type';
import {BerryDataMap} from '@/types/mongo/berry';
import {IngredientMap} from '@/types/mongo/ingredient';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {PokemonSleepDataMap, SleepMapId} from '@/types/mongo/sleepStyle';


export type AnalysisComparisonFilter = PokemonInputFilter & {
  level: number,
  mapId: FilterInclusionMap<SleepMapId>,
};

export type AnalysisPageCommonProps = {
  pokedex: PokemonInfo[],
  pokemon: PokemonInfo,
  ingredientMap: IngredientMap,
  berryDataMap: BerryDataMap,
  sleepStyleMap: PokemonSleepDataMap,
};

export type AnalysisFilterPokemonData = {
  info: PokemonInfo,
  mapsAvailable: SleepMapId[],
};
