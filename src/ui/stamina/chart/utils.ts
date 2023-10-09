import {efficiencyInSleep} from '@/const/game/efficiency';
import {StaminaEventLogFlattened} from '@/ui/stamina/type';
import {getEfficiency} from '@/utils/game/stamina/efficiency';


export const getEfficiencyFromLog = ({type, stamina}: StaminaEventLogFlattened) => {
  if (type === 'sleep') {
    return efficiencyInSleep;
  }

  return getEfficiency(stamina);
};
