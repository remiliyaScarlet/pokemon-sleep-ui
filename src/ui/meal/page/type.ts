import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal';
import {PokedexMap, PokemonIngredientProductionMapOfLevel} from '@/types/game/pokemon';
import {IngredientChainMap, IngredientLevel} from '@/types/game/pokemon/ingredient';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {Locale} from '@/types/next/locale';
import {UserSettings} from '@/types/userData/settings';


export type MealCommonProps = {
  locale: Locale,
  meal: Meal,
  pokedex: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  ingredientChainMap: IngredientChainMap,
  pokemonMaxLevel: number,
  preloadedSettings: UserSettings,
};

export type MealPokemonOfIngredientLevelProps = {
  show: boolean,
  ingredientLevel: IngredientLevel,
  pokemonIngredientProductionOfLevel: PokemonIngredientProductionMapOfLevel,
};
