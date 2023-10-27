import {mealRarityBonusAfterBreakPoint} from '@/const/game/meal';
import {mealRarityBonusBreakPoints} from '@/types/game/meal';


export const getMealRarityBonus = (ingredientCount: number): number => {
  for (const breakpoint of mealRarityBonusBreakPoints) {
    if (ingredientCount >= breakpoint) {
      return mealRarityBonusAfterBreakPoint[breakpoint];
    }
  }

  return 1;
};
