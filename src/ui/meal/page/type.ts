import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal';
import {
  PokedexMap,
  PokemonIngredientProductionMap,
  PokemonIngredientProductionMapOfLevel,
} from '@/types/game/pokemon';
import {IngredientChainMap, IngredientLevel} from '@/types/game/pokemon/ingredient';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {CalculatedUserSettings, UserSettings} from '@/types/userData/settings';


export type MealServerDataProps = {
  meal: Meal,
  pokedex: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  ingredientChainMap: IngredientChainMap,
  pokemonIngredientProductionMap: PokemonIngredientProductionMap,
  pokemonMaxLevel: number,
  preloadedSettings: UserSettings,
};

export type MealCommonProps = MealServerDataProps & {
  calculatedSettings: CalculatedUserSettings,
};

export type MealPokemonOfIngredientLevelProps = {
  show: boolean,
  ingredientLevel: IngredientLevel,
  pokemonIngredientProductionOfLevel: PokemonIngredientProductionMapOfLevel,
};
