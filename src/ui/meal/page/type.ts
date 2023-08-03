import {IngredientMap} from '@/types/mongo/ingredient';
import {Meal} from '@/types/mongo/meal';


export type MealCommonProps = {
  meal: Meal,
  ingredientMap: IngredientMap,
};
