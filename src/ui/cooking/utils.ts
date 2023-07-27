import {IngredientMap} from '@/types/mongo/ingredient';
import {Meal} from '@/types/mongo/meal';
import {toSum} from '@/utils/array';


type GetMealEnergyOpts = {
  meal: Meal,
  recipeLevel: number,
  ingredients: IngredientMap,
};

export const getMealEnergy = ({meal, recipeLevel, ingredients}: GetMealEnergyOpts): number | null => {
  const mealLevelData = meal.levels.find(({lv}) => lv === recipeLevel);

  if (!mealLevelData) {
    return null;
  }

  const energyFromIngredients = toSum(
    meal.ingredients.map(({id, quantity}) => ingredients[id].energy * quantity),
  );

  return mealLevelData.energy + energyFromIngredients;
};
