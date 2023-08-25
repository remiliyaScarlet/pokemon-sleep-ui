import {IngredientMap} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal';
import {PokedexMap, PokemonIngredientMap} from '@/types/game/pokemon';
import {IngredientLevel} from '@/types/game/pokemon/ingredient';


export type MealCommonProps = {
  meal: Meal,
  ingredientMap: IngredientMap,
  pokedex: PokedexMap,
  pokemonMaxLevel: number,
};

export type MealPokemonOfIngredientLevelProps = {
  show: boolean,
  ingredientLevel: IngredientLevel,
  pokeIngredientMap: PokemonIngredientMap,
};
