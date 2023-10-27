import {IngredientMap} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal';
import {getMealIngredientCount} from '@/utils/game/meal/count';
import {getMealLevelBonus} from '@/utils/game/meal/level';
import {getMealRarityBonus} from '@/utils/game/meal/rarity';
import {getMealIngredientStrength} from '@/utils/game/meal/strength';


export type GetMealBaseStrengthOpts = {
  level: number,
  meal: Meal,
  ingredientMap: IngredientMap,
};

export const getMealBaseStrength = ({level, meal, ingredientMap}: GetMealBaseStrengthOpts) => {
  const base = (
    getMealIngredientStrength({ingredients: meal.ingredients, ingredientMap}) *
    getMealRarityBonus(getMealIngredientCount(meal))
  );

  return {
    base,
    withLevel: base * getMealLevelBonus(level),
  };
};
