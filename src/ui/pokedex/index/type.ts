import {Session} from 'next-auth';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonInputFilter} from '@/components/shared/pokemon/input/type';
import {PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {BerryDataMap} from '@/types/mongo/berry';
import {IngredientMap} from '@/types/mongo/ingredient';
import {FieldMetaMap} from '@/types/mongo/mapMeta';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {SleepMapId, SleepStyleData} from '@/types/mongo/sleepStyle';
import {PokedexDisplayType} from '@/ui/pokedex/index/input/type';


export type PokemonInfoForPokedex = PokemonInfo & {
  sleepStyles: SleepStyleData[],
  nameOfAllLocale: string[],
};

export type PokedexData = PokemonInfoForPokedex[];

export type PokedexDisplay = {
  display: PokedexDisplayType,
  sort: PokemonSortType,
};

export type PokedexFilter = PokemonInputFilter & PokedexDisplay & {
  name: string,
  mapId: FilterInclusionMap<SleepMapId>,
  level: number,
  snorlaxFavorite: SnorlaxFavorite,
};

export type PokedexClientCommonProps = {
  pokedex: PokedexData,
  maxLevel: number,
  ingredientMap: IngredientMap,
  berryMap: BerryDataMap,
  mapMeta: FieldMetaMap,
  session: Session | null,
};

export type PokedexLinkProps = Pick<PokedexFilter, 'display'> & {
  pokemon: PokemonInfoForPokedex,
  sorter: number,
};
