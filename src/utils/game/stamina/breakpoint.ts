import {EfficiencyBreakPoint, efficiencyBreakPoints} from '@/types/game/producing/efficiency';


export const getStaminaBreakpoint = (stamina: number): EfficiencyBreakPoint => {
  for (const breakPoint of efficiencyBreakPoints) {
    if (stamina > breakPoint) {
      return breakPoint;
    }
  }

  return 0;
};
