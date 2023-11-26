import {IngredientMap} from '@/types/game/ingredient';
import {MealStrengthInfo} from '@/types/game/meal/info';
import {Meal} from '@/types/game/meal/main';
import {getMealBonus} from '@/utils/game/meal/bonus';
import {getMealIngredientStrength} from '@/utils/game/meal/strength';


export type GetMealBaseStrengthOpts = {
  level: number,
  meal: Meal,
  ingredientMap: IngredientMap,
};

// https://wikiwiki.jp/poke_sleep/%E6%96%99%E7%90%86
export const getMealBaseStrength = ({
  level,
  meal,
  ingredientMap,
}: GetMealBaseStrengthOpts): MealStrengthInfo => {
  const bonus = getMealBonus({level, meal});

  const strengthBase = getMealIngredientStrength({ingredients: meal.ingredients, ingredientMap});
  const strengthAfterRarity = Math.round(bonus.rarity * strengthBase);

  return {
    strengthBase,
    strengthAfterRarity,
    strengthFinal: Math.round(strengthAfterRarity * bonus.level),
    bonusRate: bonus.total,
  };
};
