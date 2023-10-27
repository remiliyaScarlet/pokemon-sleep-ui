import {recipeLevelData} from '@/data/recipeLevel';
import {MealRarityBonusBreakPoint} from '@/types/game/meal/rarity';


export const mealRarityBonusAfterBreakPoint: {[breakPoint in MealRarityBonusBreakPoint]: number} = {
  40: 1.35,
  30: 1.25,
  20: 1.17,
  10: 1.11,
  1: 1.06,
};

export const recipeMaxLevel = recipeLevelData.length;
