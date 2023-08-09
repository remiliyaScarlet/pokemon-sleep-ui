import {Session} from 'next-auth';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonInputFilter} from '@/components/shared/pokemon/input/type';
import {BerryData, BerryDataMap} from '@/types/mongo/berry';
import {IngredientMap} from '@/types/mongo/ingredient';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {SleepMapId, SleepStyleData} from '@/types/mongo/sleepStyle';
import {PokedexDisplayType, PokedexSortType} from '@/ui/pokedex/index/input/type';


export type PokemonInfoForPokedex = PokemonInfo & {
  sleepStyles: SleepStyleData[],
  nameOfAllLocale: string[],
};

export type PokedexData = PokemonInfoForPokedex[];

export type SortedPokemonInfo = {
  pokemon: PokemonInfoForPokedex,
  sorter: ReturnType<PokemonSorterGetter>,
};

export type PokedexDisplay = {
  display: PokedexDisplayType,
  sort: PokedexSortType,
};

export type PokedexFilter = PokemonInputFilter & PokedexDisplay & {
  name: string,
  mapId: FilterInclusionMap<SleepMapId>,
  level: number,
};

export type PokedexClientCommonProps = {
  pokedex: PokedexData,
  maxLevel: number,
  ingredientMap: IngredientMap,
  berryMap: BerryDataMap,
  session: Session | null,
};

export type PokedexLinkProps = Pick<PokedexFilter, 'display' | 'level'> & PokedexClientCommonProps & {
  pokemon: PokemonInfoForPokedex,
  sorter: ReturnType<PokemonSorterGetter>,
};

export type PokemonSorterGetterOpts = {
  pokemon: PokemonInfo,
  level: number,
  ingredientMap: IngredientMap,
  berryData: BerryData | null,
};

export type PokemonSorterGetter = (opts: PokemonSorterGetterOpts) => number;
