import {PokemonInputFilter} from '@/components/shared/pokemon/input/type';
import {PokedexMap} from '@/types/mongo/pokemon';
import {SleepStyleData} from '@/types/mongo/sleepStyle';


export type MapPageFilter = PokemonInputFilter & {
  showEmptyRank: boolean,
};

export type MapCommonProps = {
  mapId: number,
  mapName: string,
  sleepStyles: SleepStyleData[],
  pokedexMap: PokedexMap
};
