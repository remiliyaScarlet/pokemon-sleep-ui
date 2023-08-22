import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonInputFilter} from '@/components/shared/pokemon/input/type';
import {MapMeta} from '@/types/game/mapMeta';
import {PokedexMap, PokemonId} from '@/types/game/pokemon';
import {SleepStyleDataFlattened, SleepStyleId} from '@/types/game/sleepStyle';
import {SnorlaxRankInMap, SnorlaxReward} from '@/types/game/snorlax';


export const mapUnlockTableDisplayType = [
  'sleepStyle',
  'specialty',
  'sleepType',
] as const;

export type MapUnlockTableDisplayType = typeof mapUnlockTableDisplayType[number];

export type MapPageFilter = PokemonInputFilter & {
  showEmptyRank: boolean,
  sleepStyle: FilterInclusionMap<SleepStyleId>,
  displayType: MapUnlockTableDisplayType,
};

export type MapCommonProps = {
  mapId: number,
  mapName: string,
  sleepStyles: SleepStyleDataFlattened[],
  pokedexMap: PokedexMap,
  snorlaxRank: SnorlaxRankInMap,
  snorlaxReward: SnorlaxReward[],
  mapMeta: MapMeta | null,
};

export type MapInputInclusionKey = `${PokemonId}-${SleepStyleId}`;
