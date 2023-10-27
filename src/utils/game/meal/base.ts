import {IngredientMap} from '@/types/game/ingredient';
import {MealStrengthInfo} from '@/types/game/meal/info';
import {Meal} from '@/types/game/meal/main';
import {getMealIngredientCount} from '@/utils/game/meal/count';
import {getRecipeLevelData} from '@/utils/game/meal/level';
import {getMealRarityBonus} from '@/utils/game/meal/rarity';
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
  const rarityBonus = getMealRarityBonus(getMealIngredientCount(meal));
  const levelBonus = 1 + getRecipeLevelData(level).bonus;

  const strengthBase = Math.round(
    rarityBonus *
    getMealIngredientStrength({ingredients: meal.ingredients, ingredientMap}),
  );

  return {
    strengthBase,
    strengthFinal: Math.round(strengthBase * levelBonus),
    bonusRate: rarityBonus * levelBonus,
  };
};
