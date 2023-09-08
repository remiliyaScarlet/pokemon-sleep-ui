import {describe, expect, it} from '@jest/globals';

import {StaminaCalcSkillRecoveryConfig} from '@/types/game/producing/stamina';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getLogsWithPrimarySleep} from '@/utils/game/stamina/events/primary';
import {getLogsWithSecondarySleep} from '@/utils/game/stamina/events/secondary';


describe('Stamina Event Log (+Secondary)', () => {
  const sessionInfo = getSleepSessionInfo({
    primary: {
      start: 84600, // 23:30
      end: 21600, // 06:00
    },
    secondary: {
      start: 46800, // 13:00
      end: 52200, // 14:30
    },
  });

  it('is correct with secondary sleep under optimistic', () => {
    const skillRecovery: StaminaCalcSkillRecoveryConfig = {
      strategy: 'optimistic',
      dailyCount: 3,
      amount: 9,
    };

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(127);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(85);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.after).toBe(103);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(49);
    expect(logs.length).toBe(4);
  });

  it('is correct with secondary sleep under conservative', () => {
    const skillRecovery: StaminaCalcSkillRecoveryConfig = {
      strategy: 'conservative',
      dailyCount: 3,
      amount: 9,
    };

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(58);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.after).toBe(76);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(22);
    expect(logs.length).toBe(4);
  });
});
