import {countBy} from 'lodash';

import {productionMultiplierByPeriod} from '@/const/game/production';
import {RecipeLevel} from '@/types/game/cooking';
import {IngredientCounter, IngredientId} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal/main';
import {ProductionPeriod} from '@/types/game/producing/display';
import {IngredientMultiplier} from '@/types/game/producing/multiplier';
import {getMealIngredientInfo} from '@/utils/game/meal/ingredient';
import {getIngredientBonusOfMeals} from '@/utils/game/producing/ingredient/bonus';


export type GetIngredientMultiplierOpts = {
  period: ProductionPeriod,
  production: IngredientCounter,
  targetMeals: Meal[],
  recipeLevel: RecipeLevel,
};

export const getIngredientMultiplier = ({
  period,
  production,
  targetMeals,
  recipeLevel,
}: GetIngredientMultiplierOpts): IngredientMultiplier => {
  const mealIngredientInfo = getMealIngredientInfo({
    meals: targetMeals,
    mealCount: countBy(targetMeals, ({id}) => id),
  });
  const {ingredientsRequired} = mealIngredientInfo;

  const ingredientBonus = getIngredientBonusOfMeals({
    meals: targetMeals,
    mealIngredientInfo,
    recipeLevel,
  });

  return {
    override: Object.fromEntries(Object.entries(production).map(([id, quantity]) => {
      const produced = quantity ?? 0;
      const required = (ingredientsRequired[parseInt(id)] ?? 0) * productionMultiplierByPeriod[period];

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
