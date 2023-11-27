import {MealStrengthInfo} from '@/types/game/meal/info';
import {MealIngredient} from '@/types/game/meal/main';
import {getMealBaseStrength, GetMealBaseStrengthOpts} from '@/utils/game/meal/strength/base';
import {getMealIngredientStrength} from '@/utils/game/meal/strength/utils';


type GetMealFinalStrengthOpts = GetMealBaseStrengthOpts & {
  filler: MealIngredient[],
  mapBonus: number,
};

export const getMealFinalStrength = ({
  filler,
  mapBonus,
  ...opts
}: GetMealFinalStrengthOpts): MealStrengthInfo => {
  const {ingredientMap} = opts;

  const {strengthFinal, ...info} = getMealBaseStrength(opts);
  const strengthFromFiller = getMealIngredientStrength({
    ingredients: filler,
    ingredientMap,
  });

  return {
    ...info,
    strengthFinal: Math.floor((strengthFinal + strengthFromFiller) * (1 + mapBonus / 100)),
  };
};

type GetMealFinalStrengthOfNonRecipeOpts = Pick<GetMealBaseStrengthOpts, 'ingredientMap'> & {
  filler: MealIngredient[],
  mapBonus: number,
};

export const getMealFinalStrengthOfNonRecipe = ({
  ingredientMap,
  filler,
  mapBonus,
}: GetMealFinalStrengthOfNonRecipeOpts): MealStrengthInfo => {
  const strengthBase = getMealIngredientStrength({
    ingredients: filler,
    ingredientMap,
  });

  return {
    strengthBase,
    strengthAfterRarity: strengthBase,
    strengthFinal: strengthBase * (1 + mapBonus / 100),
    bonusRate: 1,
  };
};
