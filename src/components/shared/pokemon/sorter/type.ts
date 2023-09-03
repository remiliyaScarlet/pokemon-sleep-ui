import {BerryData} from '@/types/game/berry';
import {EffectiveBonus} from '@/types/game/bonus';
import {IngredientMap} from '@/types/game/ingredient';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
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
  ingredients: IngredientProduction[],
  extra: TExtra,
};

export type SortedPokemonInfo<TExtra, TSource extends PokemonInfoWithSortingPayload<TExtra>> = {
  sorter: ReturnType<PokemonSorterGetter>,
  source: TSource,
};

export type PokemonSorterGetterOpts = ProducingRateSingleParams & {
  pokemon: PokemonInfo,
  level: number,
  ingredients: IngredientProduction[],
  ingredientMap: IngredientMap,
  berryData: BerryData | null,
  snorlaxFavorite: SnorlaxFavorite,
  bonus: EffectiveBonus,
};

export type PokemonSorterGetter = (opts: PokemonSorterGetterOpts) => number;
