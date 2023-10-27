import {IngredientMap} from '@/types/game/ingredient';
import {Meal, MealLevel} from '@/types/game/meal';
import {getMealIngredientStrength} from '@/utils/game/meal/strength';


type GetMealEnergyInfoOpts = {
  meal: Meal,
  ingredientMap: IngredientMap,
  level: number,
};

export type MealEnergyInfo = {
  atLevel: MealLevel,
  diffVal: number,
  diffPct: number,
};

export const getMealEnergyInfo = ({meal, ingredientMap, level}: GetMealEnergyInfoOpts): MealEnergyInfo => {
  const atLevel = meal.levels[level - 1];

  const energyNoRecipe = getMealIngredientStrength({
    ingredients: meal.ingredients,
    ingredientMap,
  });

  return {
    atLevel,
    diffVal: atLevel.energy - energyNoRecipe,
    diffPct: energyNoRecipe === 0 ? 0 : atLevel.energy / energyNoRecipe * 100 - 100,
  };
};
