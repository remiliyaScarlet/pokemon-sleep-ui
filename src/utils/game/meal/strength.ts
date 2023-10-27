import {IngredientMap} from '@/types/game/ingredient';
import {MealIngredient} from '@/types/game/meal/main';
import {toSum} from '@/utils/array';


type GetMealIngredientStrengthOpts = {
  ingredients: MealIngredient[],
  ingredientMap: IngredientMap,
};

export const getMealIngredientStrength = ({ingredients, ingredientMap}: GetMealIngredientStrengthOpts) => toSum(
  ingredients.map(({id, quantity}) => (ingredientMap[id]?.energy ?? NaN) * quantity),
);
