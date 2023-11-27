import {describe, expect, it} from '@jest/globals';

import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getDailyAverageStaminaEfficiencyFromLogs, getStaminaEfficiency} from '@/utils/game/stamina/main';


describe('Stamina Efficiency / From Config', () => {
  it('is correct', () => {
    const config: StaminaCalcConfig = {
      sleepSession: {
        primary: {
          start: 84600, // 23:30
          end: 21600, // 06:00
        },
        secondary: {
          start: 46800, // 13:00
          end: 52200, // 14:30
        },
      },
      skillRecovery: {
        strategy: 'conservative',
      },
      recoveryRate: {
        general: 1,
        sleep: 1,
      },
    };
    const sessionInfo = getSleepSessionInfo(config.sleepSession);
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    expect(getStaminaEfficiency({config, sessionInfo, skillTriggers}).average).toBeCloseTo(2.075486);
  });

  it('is correct with multiple skill triggers', () => {
    const config: StaminaCalcConfig = {
      sleepSession: {
        primary: {
          start: 84600, // 23:30
          end: 21600, // 06:00
        },
        secondary: {
          start: 46800, // 13:00
          end: 52200, // 14:30
        },
      },
      skillRecovery: {
        strategy: 'conservative',
      },
      recoveryRate: {
        general: 1,
        sleep: 1,
      },
    };
    const sessionInfo = getSleepSessionInfo(config.sleepSession);
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
      {dailyCount: 2, amount: 9},
    ];

    expect(getStaminaEfficiency({config, sessionInfo, skillTriggers}).average).toBeCloseTo(2.17);
  });
});

describe('Stamina Efficiency / From Logs', () => {
  it('is correctly handling secondary sleep', () => {
    const efficiency = getDailyAverageStaminaEfficiencyFromLogs([
      {
        type: 'wakeup',
        timing: 0,
        stamina: {before: 4, after: 100},
        staminaUnderlying: {before: 4, after: 100},
      },
      {
        type: 'efficiencyBlock',
        timing: 12000,
        stamina: {before: 80, after: 80},
        staminaUnderlying: {before: 80, after: 80},
      },
      {
        type: 'skillRecovery',
        timing: 19200,
        stamina: {before: 68, after: 86},
        staminaUnderlying: {before: 68, after: 86},
      },
      {
        type: 'efficiencyBlock',
        timing: 22800,
        stamina: {before: 80, after: 80},
        staminaUnderlying: {before: 80, after: 80},
      },
      {
        type: 'sleep',
        timing: 34200,
        stamina: {before: 61, after: 79},
        staminaUnderlying: {before: 61, after: 79},
      },
      {
        type: 'wakeup',
        timing: 39600,
        stamina: {before: 61, after: 79},
        staminaUnderlying: {before: 61, after: 79},
      },
      {
        type: 'efficiencyBlock',
        timing: 51000,
        stamina: {before: 60, after: 60},
        staminaUnderlying: {before: 60, after: 60},
      },
      {
        type: 'sleep',
        timing: 60000,
        stamina: {before: 45, after: 45},
        staminaUnderlying: {before: 45, after: 45},
      },
    ]);

    expect(efficiency).toBeCloseTo(2.03354);
  });
});
