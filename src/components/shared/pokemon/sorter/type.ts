import {BerryData} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {ProducingRateSingleParams} from '@/types/game/producing/rate';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {CalculatedUserSettings} from '@/types/userData/settings';


export const pokemonSortType = [
  'id',
  'level',
  'dateAdded',
  'berryEnergy',
  'berryCount',
  'ingredientEnergy',
  'ingredientCount',
  'ingredientRate',
  'totalEnergy',
  'friendshipPoint',
  'frequencyBase',
  'frequency',
  'frequencyOfBerry',
  'frequencyOfIngredient',
] as const;

export type PokemonSortType = typeof pokemonSortType[number];

export type PokemonSortingRequiredData = {
  pokemon: PokemonInfo,
  pokemonProducingParams: PokemonProducingParams,
  level: number,
  ingredients: IngredientProduction[],
  dateAdded: number | null,
};

export type PokemonInfoWithSortingPayload<TExtra> = PokemonSortingRequiredData & ProducingRateSingleParams & {
  extra: TExtra,
};

export type SortedPokemonInfo<TExtra, TSource extends PokemonInfoWithSortingPayload<TExtra>> = {
  sorter: ReturnType<PokemonSorterGetter>,
  source: TSource,
};

export type PokemonSorterGetterOpts = PokemonSortingRequiredData & ProducingRateSingleParams & {
  ingredientMap: IngredientMap,
  berryData: BerryData,
  snorlaxFavorite: SnorlaxFavorite,
  calculatedSettings: CalculatedUserSettings,
};

export type PokemonSorterGetter = (opts: PokemonSorterGetterOpts) => number;
