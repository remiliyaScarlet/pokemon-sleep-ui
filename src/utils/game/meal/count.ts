import {Meal} from '@/types/game/meal/main';
import {toSum} from '@/utils/array';


export const getMealIngredientCount = (meal: Meal): number => (
  toSum(meal.ingredients.map(({quantity}) => quantity))
);
