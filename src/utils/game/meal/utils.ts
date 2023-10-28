import {MealStrengthInfo} from '@/types/game/meal/info';
import {formatInt} from '@/utils/number/format';


type FormatMealStrengthInfoOpts = {
  info: MealStrengthInfo,
  includeBonusRate?: boolean,
};

export const formatMealStrengthInfo = ({
  info,
  includeBonusRate,
}: FormatMealStrengthInfoOpts): string => {
  const {
    strengthBase,
    strengthFinal,
    bonusRate,
  } = info;

  if (includeBonusRate) {
    const bonusPercent = bonusRate * 100 - 100;

    return `${formatInt(strengthBase)} (${formatInt(strengthFinal)} / +${formatInt(bonusPercent)}%)`;
  }

  return `${formatInt(strengthBase)} (${formatInt(strengthFinal)})`;
};
