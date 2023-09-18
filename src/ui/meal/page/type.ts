import {IngredientMap} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal';
import {PokedexMap, PokemonIngredientMap} from '@/types/game/pokemon';
import {IngredientLevel} from '@/types/game/pokemon/ingredient';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {Locale} from '@/types/next/locale';
import {UserSettings} from '@/types/userData/settings';


export type MealCommonProps = {
  locale: Locale,
  meal: Meal,
  ingredientMap: IngredientMap,
  pokedex: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  pokemonMaxLevel: number,
  preloadedSettings: UserSettings,
};

export type MealPokemonOfIngredientLevelProps = {
  show: boolean,
  ingredientLevel: IngredientLevel,
  pokeIngredientMap: PokemonIngredientMap,
};
