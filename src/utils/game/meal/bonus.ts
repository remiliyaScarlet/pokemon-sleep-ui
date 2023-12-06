import {MealBonusInfo} from '@/types/game/meal/info';
import {Meal} from '@/types/game/meal/main';
import {getMealIngredientCount} from '@/utils/game/meal/count';
import {getRecipeLevelData} from '@/utils/game/meal/level';
import {getMealRarityBonus} from '@/utils/game/meal/rarity';


type GetMealBonusOpts = {
  level: number,
  meal: Meal,
};

export const getMealBonus = ({level, meal}: GetMealBonusOpts): MealBonusInfo => {
  const rarityBonus = getMealRarityBonus(getMealIngredientCount(meal));
  const levelBonus = 1 + (getRecipeLevelData(level)?.bonus ?? 0);

  return {
    level: levelBonus,
    rarity: rarityBonus,
    total: levelBonus * rarityBonus,
  };
};

type GetCommonMaxMealBonusOpts = {
  level: number,
  meals: Meal[],
};

export const getCommonMaxMealBonus = ({level, meals}: GetCommonMaxMealBonusOpts) => {
  const rarityBonus = getMealRarityBonus(Math.max(...meals.map(getMealIngredientCount)));
  const levelBonus = 1 + (getRecipeLevelData(level)?.bonus ?? 0);

  return levelBonus * rarityBonus;
};
