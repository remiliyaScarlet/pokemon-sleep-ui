import {IngredientMap} from '@/types/game/ingredient';
import {Meal, MealStrengthInfo} from '@/types/game/meal';
import {getMealIngredientCount} from '@/utils/game/meal/count';
import {getMealLevelBonus} from '@/utils/game/meal/level';
import {getMealRarityBonus} from '@/utils/game/meal/rarity';
import {getMealIngredientStrength} from '@/utils/game/meal/strength';


export type GetMealBaseStrengthOpts = {
  level: number,
  meal: Meal,
  ingredientMap: IngredientMap,
};

export const getMealBaseStrength = ({
  level,
  meal,
  ingredientMap,
}: GetMealBaseStrengthOpts): MealStrengthInfo => {
  const rarityBonus = getMealRarityBonus(getMealIngredientCount(meal));
  const levelBonus = getMealLevelBonus(level);

  const strengthBase = (
    getMealIngredientStrength({ingredients: meal.ingredients, ingredientMap}) *
    rarityBonus
  );

  return {
    strengthBase,
    strengthFinal: strengthBase * getMealLevelBonus(level),
    bonusRate: rarityBonus * levelBonus,
  };
};
