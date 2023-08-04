import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonInputFilter, PokemonInputType} from '@/components/shared/pokemon/input/type';
import {BerryData, BerryDataMap} from '@/types/mongo/berry';
import {IngredientMap} from '@/types/mongo/ingredient';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {SleepMapId, SleepStyleData} from '@/types/mongo/sleepStyle';
import {PokedexDisplayType, PokedexSortType} from '@/ui/pokedex/index/input/type';


export type PokedexSinglePokemon = PokemonInfo & {
  sleepStyles: SleepStyleData[],
};

export type PokedexData = PokedexSinglePokemon[];

export type PokedexFilter = PokemonInputFilter<PokemonInputType> & {
  mapId: FilterInclusionMap<SleepMapId>,
  level: number,
  display: PokedexDisplayType,
  sort: PokedexSortType,
};

export type PokedexClientCommonProps = {
  pokedex: PokedexData,
  maxLevel: number,
  ingredientMap: IngredientMap,
  berryMap: BerryDataMap,
};

export type PokedexLinkProps = Pick<PokedexFilter, 'display' | 'level'> & PokedexClientCommonProps & {
  pokemon: PokedexSinglePokemon,
};

export type PokemonComparerGetterOpts = {
  pokemon: PokemonInfo,
  level: number,
  ingredientMap: IngredientMap,
  berryData: BerryData | null,
};

export type PokemonComparerGetter = (opts: PokemonComparerGetterOpts) => number;
