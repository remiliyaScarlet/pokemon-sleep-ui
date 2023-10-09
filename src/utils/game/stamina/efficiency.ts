import {efficiencyBeforeBreakPoint, efficiencyInSleep} from '@/const/game/efficiency';
import {StaminaEventType} from '@/types/game/producing/stamina';
import {getStaminaBreakpoint} from '@/utils/game/stamina/utils';


type GetEfficiencyOpts = {
  type: StaminaEventType | null,
  stamina: number,
};

export const getEfficiency = ({type, stamina}: GetEfficiencyOpts) => {
  if (type === 'sleep') {
    return efficiencyInSleep;
  }

  return efficiencyBeforeBreakPoint[getStaminaBreakpoint(stamina)];
};
