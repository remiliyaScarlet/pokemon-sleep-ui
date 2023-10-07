import {efficiencyBeforeBreakPoint} from '@/const/game/efficiency';
import {getStaminaBreakpoint} from '@/utils/game/stamina/utils';


export const getEfficiency = (stamina: number): number => {
  return efficiencyBeforeBreakPoint[getStaminaBreakpoint(stamina)];
};
