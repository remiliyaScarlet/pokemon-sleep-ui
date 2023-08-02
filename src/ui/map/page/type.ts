import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonInputFilter, PokemonInputType} from '@/components/shared/pokemon/input/type';
import {PokedexMap, PokemonId} from '@/types/mongo/pokemon';
import {SleepStyleDataFlattened, SleepStyleId} from '@/types/mongo/sleepStyle';
import {SnorlaxRankInMap, SnorlaxReward} from '@/types/mongo/snorlax';


export type MapPageFilter = PokemonInputFilter<PokemonInputType> & {
  showEmptyRank: boolean,
  sleepStyle: FilterInclusionMap<SleepStyleId>,
};

export type MapCommonProps = {
  mapId: number,
  mapName: string,
  sleepStyles: SleepStyleDataFlattened[],
  pokedexMap: PokedexMap
  snorlaxRank: SnorlaxRankInMap,
  snorlaxReward: SnorlaxReward[],
};

export type MapInputInclusionKey = `${PokemonId}-${SleepStyleId}`;
