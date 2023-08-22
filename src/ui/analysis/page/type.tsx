import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonInputFilter} from '@/components/shared/pokemon/input/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonSleepDataMap, SleepMapId} from '@/types/game/sleepStyle';
import {SnorlaxFavorite} from '@/types/game/snorlax';


export type AnalysisComparisonFilter = PokemonInputFilter & {
  level: number,
  mapId: FilterInclusionMap<SleepMapId>,
  snorlaxFavorite: SnorlaxFavorite,
};

export type AnalysisPageCommonProps = {
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
