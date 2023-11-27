import {countBy} from 'lodash';

import {RecipeLevel} from '@/types/game/cooking';
import {IngredientCounter} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal/main';
import {getMealIngredientInfo} from '@/utils/game/meal/ingredient';
import {getIngredientBonusOfMeals} from '@/utils/game/producing/ingredient/bonus';


export type GetIngredientMultiplierOpts = {
  production: IngredientCounter,
  targetMeals: Meal[],
  recipeLevel: RecipeLevel,
};

export const getIngredientMultiplier = ({
  production,
  targetMeals,
  recipeLevel,
}: GetIngredientMultiplierOpts): IngredientCounter => {
  const mealIngredientInfo = getMealIngredientInfo({
    meals: targetMeals,
    mealCount: countBy(targetMeals, ({id}) => id),
  });
  const ingredientBonus = getIngredientBonusOfMeals({
    meals: targetMeals,
    mealIngredientInfo,
    recipeLevel,
  });
  const {ingredientsRequired} = mealIngredientInfo;

  return Object.fromEntries(Object.entries(production).map(([id, quantity]) => {
    const produced = quantity ?? 0;
    const required = ingredientsRequired[parseInt(id)] ?? 0;

    const recipe = Math.min(produced, required);
    const filler = Math.max(produced - required, 0);

    return [
      id,
      (recipe * (ingredientBonus[parseInt(id)] ?? 1) + filler) / (recipe + filler),
    ];
  }));
};
