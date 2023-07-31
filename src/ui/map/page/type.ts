import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonInputFilter, PokemonInputType} from '@/components/shared/pokemon/input/type';
import {PokedexMap, PokemonId} from '@/types/mongo/pokemon';
import {SleepStyleDataFlattened, SleepStyleId} from '@/types/mongo/sleepStyle';


export type MapPageFilter = PokemonInputFilter<PokemonInputType> & {
  showEmptyRank: boolean,
  sleepStyle: FilterInclusionMap<SleepStyleId>,
};

export type MapCommonProps = {
  mapId: number,
  mapName: string,
  sleepStyles: SleepStyleDataFlattened[],
  pokedexMap: PokedexMap
};

export type MapInputInclusionKey = `${PokemonId}-${SleepStyleId}`;
