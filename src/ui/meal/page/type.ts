import {IngredientMap} from '@/types/mongo/ingredient';
import {Meal} from '@/types/mongo/meal';
import {PokedexMap} from '@/types/mongo/pokemon';


export type MealCommonProps = {
  meal: Meal,
  ingredientMap: IngredientMap,
  pokedex: PokedexMap,
  pokemonMaxLevel: number,
};
