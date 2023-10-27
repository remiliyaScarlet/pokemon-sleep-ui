import {MealIngredient, MealStrengthInfo} from '@/types/game/meal';
import {getMealBaseStrength, GetMealBaseStrengthOpts} from '@/utils/game/meal/base';
import {getMealIngredientStrength} from '@/utils/game/meal/strength';


type GetMealFinalStrengthOpts = GetMealBaseStrengthOpts & {
  filler: MealIngredient[],
  mapBonus: number,
};

export const getMealFinalStrength = ({filler, mapBonus, ...opts}: GetMealFinalStrengthOpts): MealStrengthInfo => {
  const {ingredientMap} = opts;

  const {base, withLevel} = getMealBaseStrength(opts);
  const strengthFromFiller = getMealIngredientStrength({
    ingredients: filler,
    ingredientMap,
  });

  const mealStrength = withLevel + strengthFromFiller;

  return {
    base,
    withMapBonus: mealStrength * (1 + mapBonus / 100),
  };
};
