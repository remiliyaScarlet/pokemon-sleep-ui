import {IngredientMap} from '@/types/mongo/ingredient';
import {Meal, MealLevel} from '@/types/mongo/meal';
import {toSum} from '@/utils/array';


export const getMealRequiredQuantity = ({ingredients}: Meal) => toSum(ingredients.map(({quantity}) => quantity));

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

  const energyNoRecipe = toSum(
    meal.ingredients.map(({id, quantity}) => (ingredientMap[id]?.energy ?? 0) * quantity),
  );

  return {
    atLevel,
    diffVal: atLevel.energy - energyNoRecipe,
    diffPct: energyNoRecipe === 0 ? 0 : atLevel.energy / energyNoRecipe * 100 - 100,
  };
};
