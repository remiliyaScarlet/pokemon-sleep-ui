import {MealStrengthInfo} from '@/types/game/meal';
import {formatInt} from '@/utils/number';


export const formatMealStrengthInfo = ({strengthBase, strengthFinal}: MealStrengthInfo): string => {
  return `${formatInt(strengthBase)} (${formatInt(strengthFinal)})`;
};
