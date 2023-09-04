import {EfficiencyBreakPoint} from '@/types/game/producing/efficiency';


export const efficiencyBeforeBreakPoint: {[breakPoint in EfficiencyBreakPoint]: number} = {
  80: 2.5,
  60: 2,
  40: 5 / 3, // 1.667
  20: 1.25,
};

export const efficiencyDuringSleep = 2.25;
