import {EfficiencyBreakPoint} from '@/types/game/producing/efficiency';


export const efficiencyBeforeBreakPoint: {[breakPoint in EfficiencyBreakPoint]: number} = {
  80: 2.22,
  60: 1.92,
  40: 1.61,
  20: 1.41,
  0: 1,
};

export const efficiencyInSleep = efficiencyBeforeBreakPoint['80'];
