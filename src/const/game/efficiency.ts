import {EfficiencyBreakPoint} from '@/types/game/producing/efficiency';


export const efficiencyBeforeBreakPoint: {[breakPoint in EfficiencyBreakPoint]: number} = {
  80: 2.2,
  60: 1.9,
  40: 1.6,
  20: 1.3,
};

export const efficiencyDuringSleep = 2.2;
