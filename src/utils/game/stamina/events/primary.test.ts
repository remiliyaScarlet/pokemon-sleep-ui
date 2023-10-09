import {describe, expect, it} from '@jest/globals';

import {StaminaCalcSkillRecoveryConfig} from '@/types/game/producing/stamina';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getLogsWithPrimarySleep} from '@/utils/game/stamina/events/primary';


describe('Stamina Event Log (+Primary)', () => {
  it('is correct with energy never hitting 0 under optimistic', () => {
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 57600, // 16:00
        end: 0, // 00:00
      },
      secondary: null,
    });

    const skillRecovery: StaminaCalcSkillRecoveryConfig = {
      strategy: 'optimistic',
      dailyCount: 3,
      amount: 9,
    };

    const logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(127);
    expect(logs[0].staminaUnderlying.after).toBe(127);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(57600);
    expect(logs[1].stamina.before).toBe(31);
    expect(logs[1].staminaUnderlying.before).toBe(31);
    expect(logs.length).toBe(2);
  });

  it('is correct with energy never hitting 0 under conservative', () => {
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 57600, // 16:00
        end: 0, // 00:00
      },
      secondary: null,
    });

    const skillRecovery: StaminaCalcSkillRecoveryConfig = {
      strategy: 'conservative',
      dailyCount: 3,
      amount: 9,
    };

    const logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[0].staminaUnderlying.after).toBe(100);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(57600);
    expect(logs[1].stamina.before).toBe(4);
    expect(logs[1].staminaUnderlying.before).toBe(4);
    expect(logs.length).toBe(2);
  });

  it('is correct with energy hitting 0', () => {
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 81000, // 22:30
        end: 0, // 00:00
      },
      secondary: null,
    });

    const skillRecovery: StaminaCalcSkillRecoveryConfig = {
      strategy: 'conservative',
      dailyCount: 0,
      amount: 9,
    };

    const logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[0].staminaUnderlying.after).toBe(100);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(81000);
    expect(logs[1].stamina.before).toBe(0);
    expect(logs[1].staminaUnderlying.before).toBe(-35);
    expect(logs.length).toBe(2);
  });
});
