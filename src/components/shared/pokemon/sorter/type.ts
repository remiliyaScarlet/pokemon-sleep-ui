import {BerryData} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonIngredientPick} from '@/types/game/producing/ingredient';
import {ProducingRateSingleParams} from '@/types/game/producing/rate';
import {SnorlaxFavorite} from '@/types/game/snorlax';


export const pokemonSortType = [
  'id',
  'berryEnergy',
  'berryCount',
  'ingredientEnergy',
  'ingredientCount',
  'totalEnergy',
  'friendshipPoint',
  'frequency',
] as const;

export type PokemonSortType = typeof pokemonSortType[number];

export type PokemonInfoWithSortingPayload<TExtra> = ProducingRateSingleParams & {
  pokemon: PokemonInfo,
  level: number,
  ingredients: PokemonIngredientPick[],
  extra: TExtra,
};

export type SortedPokemonInfo<TExtra, TSource extends PokemonInfoWithSortingPayload<TExtra>> = {
  sorter: ReturnType<PokemonSorterGetter>,
  source: TSource,
};

export type PokemonSorterGetterOpts = ProducingRateSingleParams & {
  pokemon: PokemonInfo,
  level: number,
  ingredients: PokemonIngredientPick[],
  ingredientMap: IngredientMap,
  berryData: BerryData | null,
  snorlaxFavorite: SnorlaxFavorite,
};

export type PokemonSorterGetter = (opts: PokemonSorterGetterOpts) => number;
