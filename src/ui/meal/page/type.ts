import {IngredientMap} from '@/types/mongo/ingredient';
import {Meal} from '@/types/mongo/meal';


export type MealMetaProps = {
  meal: Meal,
  ingredients: IngredientMap,
};
