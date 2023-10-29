import React from 'react';

import {Meal} from '@/types/game/meal/main';
import {MealPreparerInfoOfMealType} from '@/ui/cooking/prepare/mealType/type';
import {MealPreparerCommonProps} from '@/ui/cooking/prepare/type';
import {toSum} from '@/utils/array';
import {subtractIngredientCount, toMealIngredientFromIngredientCounter} from '@/utils/game/cooking';
import {getMealsIngredientsRequired} from '@/utils/game/meal/count';
import {getMealFinalStrength, getMealFinalStrengthOfNonRecipe} from '@/utils/game/meal/main';
import {isNotNullish} from '@/utils/type';


type UseMealPreparerInfoOfMealTypeOpts = MealPreparerCommonProps & {
  mealsOfType: Meal[],
};

export const useMealPreparerInfoOfMealType = ({
  filter,
  calculatedSettings,
  ingredientMap,
  mealsOfType,
}: UseMealPreparerInfoOfMealTypeOpts): MealPreparerInfoOfMealType => {
  const {mealsWanted, recipeLevel} = filter;

  return React.useMemo(
    (): MealPreparerInfoOfMealType => {
      const mapBonus = calculatedSettings.bonus.map;

      const required = getMealsIngredientsRequired({meals: mealsOfType, mealCount: filter.mealsWanted});
      const filler = subtractIngredientCount(filter.inventory, required);

      const finalStrength: MealPreparerInfoOfMealType['finalStrength'] = Object.fromEntries(mealsOfType
        .map((meal) => {
          const count = mealsWanted[meal.id];
          if (!count) {
            return null;
          }

          const info = getMealFinalStrength({
            filler: [],
            mapBonus,
            level: recipeLevel[meal.id] ?? 1,
            meal,
            ingredientMap,
          });

          return [meal.id, info.strengthFinal * count];
        })
        .filter(isNotNullish));

      const recipeStrength = toSum(Object.values(finalStrength).filter(isNotNullish));
      const fillerStrength = getMealFinalStrengthOfNonRecipe({
        filler: toMealIngredientFromIngredientCounter(filler),
        ingredientMap,
        mapBonus,
      }).strengthFinal;

      return {
        ingredients: {
          filler,
          missing: subtractIngredientCount(required, filter.inventory),
          required,
        },
        finalStrength,
        stats: {
          recipeOnly: recipeStrength,
          withFiller: recipeStrength + fillerStrength,
        },
      };
    },
    [mealsWanted, recipeLevel, calculatedSettings, mealsOfType, ingredientMap],
  );
};
