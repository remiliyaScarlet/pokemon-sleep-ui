import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonInputFilter, UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {MapMeta} from '@/types/game/mapMeta';
import {PokedexMap, PokemonId} from '@/types/game/pokemon';
import {SleepdexMap} from '@/types/game/sleepdex';
import {SleepStyleNormalFlattened, SleepStyleId} from '@/types/game/sleepStyle';
import {SnorlaxRankInMap, SnorlaxReward} from '@/types/game/snorlax';


export const mapUnlockTableDisplayType = [
  'sleepStyle',
  'specialty',
  'sleepType',
] as const;

export type MapUnlockTableDisplayType = typeof mapUnlockTableDisplayType[number];

export type MapPageFilter = PokemonInputFilter & {
  showEmptyRank: boolean,
  showSleepdexStats: boolean,
  showLockedOnly: boolean,
  markingSleepdex: boolean,
  sleepStyle: FilterInclusionMap<SleepStyleId>,
  displayType: MapUnlockTableDisplayType,
};

export type MapPageServerDataProps = UsePokemonFilterCommonData & {
  mapId: number,
  sleepStyles: SleepStyleNormalFlattened[],
  pokedexMap: PokedexMap,
  snorlaxRank: SnorlaxRankInMap,
  snorlaxReward: SnorlaxReward[],
  mapMeta: MapMeta | null,
  sleepdexMap: SleepdexMap,
  isLoggedIn: boolean,
};

export type MapCommonProps = MapPageServerDataProps & {
  mapName: string,
};

export type MapInputInclusionKey = `${PokemonId}-${SleepStyleId}`;
