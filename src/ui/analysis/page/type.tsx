import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonInputFilter} from '@/components/shared/pokemon/input/type';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {BerryDataMap} from '@/types/mongo/berry';
import {IngredientMap} from '@/types/mongo/ingredient';
import {FieldMetaMap} from '@/types/mongo/mapMeta';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {PokemonSleepDataMap, SleepMapId} from '@/types/mongo/sleepStyle';


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
