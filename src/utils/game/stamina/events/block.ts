import {staminaDepleteInterval} from '@/const/game/stamina';
import {efficiencyBreakPoints} from '@/types/game/producing/efficiency';
import {StaminaEventLog} from '@/types/game/producing/stamina';


type GetLogsWithEfficiencyBlockOpts = {
  logs: StaminaEventLog[],
};

export const getLogsWithEfficiencyBlock = ({logs}: GetLogsWithEfficiencyBlockOpts): StaminaEventLog[] => {
  const newLogs: StaminaEventLog[] = [logs[0]];

  for (let i = 1; i < logs.length; i++) {
    const prev = logs[i - 1];
    const curr = logs[i];

    if (prev.type === 'sleep') {
      newLogs.push(curr);
      continue;
    }

    for (const breakPoint of [...efficiencyBreakPoints].sort((a, b) => b - a)) {
      if (breakPoint < curr.stamina.before) {
        break;
      }

      if (breakPoint > prev.stamina.after) {
        continue;
      }

      newLogs.push({
        type: 'efficiencyBlock',
        timing: prev.timing + (prev.stamina.after - breakPoint) * staminaDepleteInterval,
        stamina: {before: breakPoint, after: breakPoint},
        staminaUnderlying: {before: breakPoint, after: breakPoint},
      });
    }

    newLogs.push(curr);
  }

  return newLogs;
};
