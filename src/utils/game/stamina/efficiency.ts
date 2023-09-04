import {efficiencyBeforeBreakPoint} from '@/const/game/efficiency';
import {efficiencyBreakPoints} from '@/types/game/producing/efficiency';


export const getEfficiency = (stamina: number): number => {
  for (const breakPoint of efficiencyBreakPoints) {
    if (stamina > breakPoint) {
      return efficiencyBeforeBreakPoint[breakPoint];
    }
  }

  return 1;
};
