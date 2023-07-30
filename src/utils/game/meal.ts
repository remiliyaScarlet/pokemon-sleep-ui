import {IngredientMap} from '@/types/mongo/ingredient';
import {Meal} from '@/types/mongo/meal';
import {toSum} from '@/utils/array';


export const getMealRequiredQuantity = ({ingredients}: Meal) => toSum(ingredients.map(({quantity}) => quantity));

type GetMealEnergyInfoOpts = {
  meal: Meal,
  ingredients: IngredientMap,
  level: number,
};

export const getMealEnergyInfo = ({meal, ingredients, level}: GetMealEnergyInfoOpts) => {
  const atLevel = meal.levels[level - 1];

  const energyNoRecipe = toSum(
    meal.ingredients.map(({id, quantity}) => ingredients[id].energy * quantity),
  );

  return {
    atLevel,
    diffVal: atLevel.energy - energyNoRecipe,
    diffPct: energyNoRecipe === 0 ? 0 : atLevel.energy / energyNoRecipe * 100 - 100,
  };
};
