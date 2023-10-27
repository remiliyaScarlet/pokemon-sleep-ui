import {Meal} from '@/types/game/meal';
import {toSum} from '@/utils/array';


export const getMealIngredientCount = (meal: Meal) => (
  toSum(meal.ingredients.map(({quantity}) => quantity))
);
