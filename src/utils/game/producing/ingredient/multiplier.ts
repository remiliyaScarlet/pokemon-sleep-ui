import {countBy} from 'lodash';

import {RecipeLevel} from '@/types/game/cooking';
import {IngredientCounter, IngredientId} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal/main';
import {IngredientMultiplier} from '@/types/game/producing/multiplier';
import {getCommonMaxMealBonus} from '@/utils/game/meal/bonus';
import {getMealIngredientInfo} from '@/utils/game/meal/ingredient';
import {getIngredientBonusOfMeals} from '@/utils/game/producing/ingredient/bonus';
import {isNotNullish} from '@/utils/type';


export type GetIngredientMultiplierOpts = {
  production: IngredientCounter,
  targetMeals: Meal[],
  recipeLevel: RecipeLevel,
  useMaxIngredientMultiplier?: boolean,
};

export const getIngredientMultiplier = ({
  production,
  targetMeals,
  recipeLevel,
  useMaxIngredientMultiplier,
}: GetIngredientMultiplierOpts): IngredientMultiplier => {
  if (useMaxIngredientMultiplier) {
    return {
      override: {},
      defaultValue: getCommonMaxMealBonus({
        level: Math.max(...Object.values(recipeLevel).filter(isNotNullish)),
        meals: targetMeals},
      ),
    };
  }

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

  return {
    override: Object.fromEntries(Object.entries(production).map(([id, quantity]) => {
      const produced = quantity ?? 0;
      const required = ingredientsRequired[parseInt(id)] ?? 0;

      const recipe = Math.min(produced, required);
      const filler = Math.max(produced - required, 0);
      const total = recipe + filler;

      if (!total) {
        return [id, 0];
      }

      return [
        id,
        (recipe * (ingredientBonus[parseInt(id)] ?? 1) + filler) / total,
      ];
    })),
    defaultValue: 1,
  };
};

type GetIngredientMultiplierValueOpts = {
  multiplier: IngredientMultiplier,
  ingredientId: IngredientId,
};

export const getIngredientMultiplierValue = ({
  multiplier,
  ingredientId,
}: GetIngredientMultiplierValueOpts): number => {
  const {defaultValue, override} = multiplier;
  return override[ingredientId] ?? defaultValue;
};
