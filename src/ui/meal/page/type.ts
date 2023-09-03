import {IngredientMap} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal';
import {PokedexMap, PokemonIngredientMap} from '@/types/game/pokemon';
import {IngredientLevel} from '@/types/game/pokemon/ingredient';
import {Locale} from '@/types/next/locale';
import {UserSettings} from '@/types/userData/settings';


export type MealCommonProps = {
  locale: Locale,
  meal: Meal,
  ingredientMap: IngredientMap,
  pokedex: PokedexMap,
  pokemonMaxLevel: number,
  preloadedSettings: UserSettings,
};

export type MealPokemonOfIngredientLevelProps = {
  show: boolean,
  ingredientLevel: IngredientLevel,
  pokeIngredientMap: PokemonIngredientMap,
};
