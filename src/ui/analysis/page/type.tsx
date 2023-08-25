import {PokemonInputFilterExtended, UsePokemonFilterCommonData} from '@/components/shared/pokemon/input/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {PokemonSleepDataMap, SleepMapId} from '@/types/game/sleepStyle';


export type AnalysisComparisonFilter = PokemonInputFilterExtended & {
  ingredients: IngredientProductionAtLevels,
};

export type AnalysisPageCommonProps = UsePokemonFilterCommonData & {
  pokedex: PokemonInfo[],
  pokemon: PokemonInfo,
  ingredientMap: IngredientMap,
  berryDataMap: BerryDataMap,
  sleepStyleMap: PokemonSleepDataMap,
  mapMeta: FieldMetaMap,
};

export type AnalysisFilterPokemonData = {
  info: PokemonInfo,
  mapsAvailable: SleepMapId[],
};
