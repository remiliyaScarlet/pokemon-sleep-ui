import {efficiencyBeforeBreakPoint} from '@/const/game/efficiency';
import {getStaminaBreakpoint} from '@/utils/game/stamina/utils';


type GetEfficiencyOpts = {
  stamina: number,
};

export const getEfficiency = ({stamina}: GetEfficiencyOpts) => {
  return efficiencyBeforeBreakPoint[getStaminaBreakpoint(stamina)];
};
