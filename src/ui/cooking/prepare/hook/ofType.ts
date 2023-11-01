import {Meal} from '@/types/game/meal/main';
import {MealPreparerInfoOfMealType} from '@/ui/cooking/prepare/hook/type';
import {MealPreparerCommonProps} from '@/ui/cooking/prepare/type';
import {getMealPreparerIngredientStats} from '@/ui/cooking/prepare/utils';
import {toSum} from '@/utils/array';
import {toMealIngredientFromIngredientCounter} from '@/utils/game/cooking';
import {getMealsIngredientsRequired} from '@/utils/game/meal/count';
import {getMealFinalStrength, getMealFinalStrengthOfNonRecipe} from '@/utils/game/meal/main';
import {isNotNullish} from '@/utils/type';


type GetMealPreparerInfoOfMealTypeOpts = Pick<
  MealPreparerCommonProps,
  'filter' | 'calculatedSettings' | 'ingredientMap'
> & {
  mealsOfType: Meal[],
};

export const getMealPreparerInfoOfMealType = ({
  filter,
  calculatedSettings,
  ingredientMap,
  mealsOfType,
}: GetMealPreparerInfoOfMealTypeOpts): MealPreparerInfoOfMealType => {
  const {mealsWanted, recipeLevel} = filter;

  const mapBonus = calculatedSettings.bonus.map;

  const required = getMealsIngredientsRequired({meals: mealsOfType, mealCount: filter.mealsWanted});
  const ingredients = getMealPreparerIngredientStats({
    required,
    inventory: filter.inventory,
  });

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
    filler: toMealIngredientFromIngredientCounter(ingredients.filler),
    ingredientMap,
    mapBonus,
  }).strengthFinal;

  return {
    ingredients,
    finalStrength,
    summary: {
      recipeOnly: recipeStrength,
      withFiller: recipeStrength + fillerStrength,
    },
    mealsOfType,
  };
};
