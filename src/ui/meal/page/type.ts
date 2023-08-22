import {IngredientMap} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal';
import {PokedexMap} from '@/types/game/pokemon';


export type MealCommonProps = {
  meal: Meal,
  ingredientMap: IngredientMap,
  pokedex: PokedexMap,
  pokemonMaxLevel: number,
};
