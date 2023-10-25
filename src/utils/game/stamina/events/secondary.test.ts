import {describe, expect, it} from '@jest/globals';

import {StaminaRecoveryRateConfig, StaminaSkillRecoveryConfig} from '@/types/game/producing/stamina';
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

  it('is correct under optimistic', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1,
      sleep: 1,
    };
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
      dailyCount: 3,
      amount: 9,
    };

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(127);
    expect(logs[0].staminaUnderlying.after).toBe(127);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(85);
    expect(logs[1].staminaUnderlying.before).toBe(85);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.after).toBe(103);
    expect(logs[2].staminaUnderlying.after).toBe(103);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(49);
    expect(logs[3].staminaUnderlying.before).toBe(49);
    expect(logs.length).toBe(4);
  });

  it('is correct under conservative', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1,
      sleep: 1,
    };
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
      dailyCount: 3,
      amount: 9,
    };

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[0].staminaUnderlying.after).toBe(100);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(58);
    expect(logs[1].staminaUnderlying.before).toBe(58);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.after).toBe(76);
    expect(logs[2].staminaUnderlying.after).toBe(76);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(22);
    expect(logs[3].staminaUnderlying.before).toBe(22);
    expect(logs.length).toBe(4);
  });

  it('is correct occurred after 0 energy', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 81000, // 22:30
        end: 0, // 00:00
      },
      secondary: {
        start: 68400, // 19:00
        end: 72000, // 20:00
      },
    });

    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
      dailyCount: 0,
      amount: 9,
    };

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[0].staminaUnderlying.after).toBe(100);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(68400);
    expect(logs[1].stamina.before).toBe(0);
    expect(logs[1].staminaUnderlying.before).toBe(-14);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(72000);
    expect(logs[2].stamina.after).toBe(12);
    expect(logs[2].staminaUnderlying.after).toBe(-2);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(81000);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-17);
    expect(logs.length).toBe(4);
  });

  it('is correct with > 1 recovery rate under optimistic', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1.2,
      sleep: 1,
    };
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
      dailyCount: 3,
      amount: 9,
    };

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(133);
    expect(logs[0].staminaUnderlying.after).toBe(133);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(91);
    expect(logs[1].staminaUnderlying.before).toBe(91);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.after).toBe(113);
    expect(logs[2].staminaUnderlying.after).toBe(113);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(59);
    expect(logs[3].staminaUnderlying.before).toBe(59);
    expect(logs.length).toBe(4);
  });

  it('is correct with < 1 recovery rate under optimistic', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
      dailyCount: 3,
      amount: 9,
    };

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(124);
    expect(logs[0].staminaUnderlying.after).toBe(124);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(82);
    expect(logs[1].staminaUnderlying.before).toBe(82);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.after).toBe(97);
    expect(logs[2].staminaUnderlying.after).toBe(97);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(43);
    expect(logs[3].staminaUnderlying.before).toBe(43);
    expect(logs.length).toBe(4);
  });

  it('is correct with > 1 recovery rate under conservative', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1.2,
      sleep: 1,
    };
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
      dailyCount: 3,
      amount: 9,
    };

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[0].staminaUnderlying.after).toBe(100);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(58);
    expect(logs[1].staminaUnderlying.before).toBe(58);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.after).toBe(80);
    expect(logs[2].staminaUnderlying.after).toBe(80);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(26);
    expect(logs[3].staminaUnderlying.before).toBe(26);
    expect(logs.length).toBe(4);
  });

  it('is correct with < 1 recovery rate under conservative', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
      dailyCount: 3,
      amount: 9,
    };

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[0].staminaUnderlying.after).toBe(100);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(58);
    expect(logs[1].staminaUnderlying.before).toBe(58);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.after).toBe(73);
    expect(logs[2].staminaUnderlying.after).toBe(73);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(19);
    expect(logs[3].staminaUnderlying.before).toBe(19);
    expect(logs.length).toBe(4);
  });
});
