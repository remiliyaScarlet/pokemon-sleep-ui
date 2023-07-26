import {PokemonIngredientId} from '@/types/mongo/pokemon';


export type MealFilter = {
  ingredient: PokemonIngredientId | null,
};
