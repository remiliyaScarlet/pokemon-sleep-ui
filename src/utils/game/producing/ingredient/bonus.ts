import {RecipeLevel} from '@/types/game/cooking';
import {IngredientCounter} from '@/types/game/ingredient';
import {MealIngredientInfo} from '@/types/game/meal/info';
import {Meal} from '@/types/game/meal/main';
import {toSum} from '@/utils/array';
import {getMealBonus} from '@/utils/game/meal/bonus';
import {isNotNullish} from '@/utils/type';


type GetIngredientBonusOfMealsOpts = {
  meals: Meal[],
  mealIngredientInfo: MealIngredientInfo,
  recipeLevel: RecipeLevel,
};

export const getIngredientBonusOfMeals = ({
  meals,
  mealIngredientInfo,
  recipeLevel,
}: GetIngredientBonusOfMealsOpts): IngredientCounter => {
  const {ingredientsRequired, ingredientOfMeals} = mealIngredientInfo;

  const mealBonusMap = Object.fromEntries(meals.map((meal) => [
    meal.id,
    getMealBonus({
      level: recipeLevel[meal.id] ?? 1,
      meal,
    }),
  ]));

  return Object.fromEntries(Object.entries(ingredientsRequired)
    .map(([ingredientId, totalRequired]) => {
      if (!totalRequired) {
        return null;
      }

      const weightedBonus = toSum(
        Object.entries(ingredientOfMeals[parseInt(ingredientId)] ?? {})
          .map(([mealId, quantityOnMeal]) => (
            mealBonusMap[parseInt(mealId)].total * (quantityOnMeal ?? 0)
          )),
      );

      return [
        ingredientId,
        weightedBonus / totalRequired,
      ];
    })
    .filter(isNotNullish));
};
