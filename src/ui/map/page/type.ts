import {PokemonInputFilter} from '@/components/shared/pokemon/input/type';
import {PokedexMap, PokemonId} from '@/types/mongo/pokemon';
import {SleepStyleDataFlattened, SleepStyleId} from '@/types/mongo/sleepStyle';


export type MapPageFilter = PokemonInputFilter & {
  showEmptyRank: boolean,
  sleepStyle: SleepStyleId | null,
};

export type MapCommonProps = {
  mapId: number,
  mapName: string,
  sleepStyles: SleepStyleDataFlattened[],
  pokedexMap: PokedexMap
};

export type MapInputInclusionKey = `${PokemonId}-${SleepStyleId}`;
