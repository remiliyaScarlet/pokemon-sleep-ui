import {describe, expect, it} from '@jest/globals';

import {StaminaCalcSkillRecoveryConfig} from '@/types/game/producing/stamina';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getLogsWithPrimarySleep} from '@/utils/game/stamina/events/primary';
import {getLogsWithSecondarySleep} from '@/utils/game/stamina/events/secondary';
import {getLogsWithSkillRecovery} from '@/utils/game/stamina/events/skill';


describe('Stamina Event Log (+Skill)', () => {
  it('is correct with secondary sleep before any skill trigger under conservative', () => {
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 84600, // 23:30
        end: 21600, // 06:00
      },
      secondary: {
        start: 25200, // 07:00
        end: 30600, // 08:30
      },
    });

    const skillRecovery: StaminaCalcSkillRecoveryConfig = {
      strategy: 'conservative',
      dailyCount: 3,
      amount: 9,
    };

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(3600);
    expect(logs[1].stamina.before).toBe(94);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(9000);
    expect(logs[2].stamina.after).toBe(112);
    expect(logs[3].type).toBe('skillRecovery');
    expect(logs[3].timing).toBe(19800);
    expect(logs[3].stamina.before).toBe(94);
    expect(logs[3].stamina.after).toBe(103);
    expect(logs[4].type).toBe('skillRecovery');
    expect(logs[4].timing).toBe(34200);
    expect(logs[4].stamina.before).toBe(79);
    expect(logs[4].stamina.after).toBe(88);
    expect(logs[5].type).toBe('skillRecovery');
    expect(logs[5].timing).toBe(48600);
    expect(logs[5].stamina.before).toBe(64);
    expect(logs[5].stamina.after).toBe(73);
    expect(logs[6].type).toBe('sleep');
    expect(logs[6].timing).toBe(63000);
    expect(logs[6].stamina.before).toBe(49);
    expect(logs.length).toBe(7);
  });

  it('is correct with secondary sleep after a skill trigger under conservative', () => {
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

    const skillRecovery: StaminaCalcSkillRecoveryConfig = {
      strategy: 'conservative',
      dailyCount: 3,
      amount: 9,
    };

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[1].type).toBe('skillRecovery');
    expect(logs[1].timing).toBe(14400);
    expect(logs[1].stamina.before).toBe(76);
    expect(logs[1].stamina.after).toBe(85);
    expect(logs[2].type).toBe('sleep');
    expect(logs[2].timing).toBe(25200);
    expect(logs[2].stamina.before).toBe(67);
    expect(logs[3].type).toBe('wakeup');
    expect(logs[3].timing).toBe(30600);
    expect(logs[3].stamina.after).toBe(85);
    expect(logs[4].type).toBe('skillRecovery');
    expect(logs[4].timing).toBe(34200);
    expect(logs[4].stamina.before).toBe(79);
    expect(logs[4].stamina.after).toBe(88);
    expect(logs[5].type).toBe('skillRecovery');
    expect(logs[5].timing).toBe(48600);
    expect(logs[5].stamina.before).toBe(64);
    expect(logs[5].stamina.after).toBe(73);
    expect(logs[6].type).toBe('sleep');
    expect(logs[6].timing).toBe(63000);
    expect(logs[6].stamina.before).toBe(49);
    expect(logs.length).toBe(7);
  });

  it('is correct with secondary sleep under optimistic strategy', () => {
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

    const skillRecovery: StaminaCalcSkillRecoveryConfig = {
      strategy: 'optimistic',
      dailyCount: 3,
      amount: 9,
    };

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, logs});

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

  it('is correct if the energy at the end of the day is 0', () => {
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 75600, // 21:00
        end: 79200, // 22:00
      },
      secondary: null,
    });

    const skillRecovery: StaminaCalcSkillRecoveryConfig = {
      strategy: 'conservative',
      dailyCount: 2,
      amount: 9,
    };

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[1].type).toBe('skillRecovery');
    expect(logs[1].timing).toBe(27600);
    expect(logs[1].stamina.before).toBe(54);
    expect(logs[1].stamina.after).toBe(63);
    expect(logs[2].type).toBe('skillRecovery');
    expect(logs[2].timing).toBe(55200);
    expect(logs[2].stamina.before).toBe(17);
    expect(logs[2].stamina.after).toBe(26);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(82800);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs.length).toBe(4);
  });

  it('is correct if the energy at the end of the day is low', () => {
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 61200, // 17:00
        end: 79200, // 22:00
      },
      secondary: null,
    });

    const skillRecovery: StaminaCalcSkillRecoveryConfig = {
      strategy: 'conservative',
      dailyCount: 2,
      amount: 9,
    };

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[1].type).toBe('skillRecovery');
    expect(logs[1].timing).toBe(22800);
    expect(logs[1].stamina.before).toBe(62);
    expect(logs[1].stamina.after).toBe(71);
    expect(logs[2].type).toBe('skillRecovery');
    expect(logs[2].timing).toBe(45600);
    expect(logs[2].stamina.before).toBe(33);
    expect(logs[2].stamina.after).toBe(42);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(68400);
    expect(logs[3].stamina.before).toBe(4);
    expect(logs.length).toBe(4);
  });

  it('is correct with secondary sleep happened at low energy', () => {
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 75600, // 21:00
        end: 0, // 00:00
      },
      secondary: {
        start: 68400, // 19:00
        end: 72000, // 20:00
      },
    });

    const skillRecovery: StaminaCalcSkillRecoveryConfig = {
      strategy: 'conservative',
      dailyCount: 2,
      amount: 9,
    };

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[1].type).toBe('skillRecovery');
    expect(logs[1].timing).toBe(24000);
    expect(logs[1].stamina.before).toBe(60);
    expect(logs[1].stamina.after).toBe(69);
    expect(logs[2].type).toBe('skillRecovery');
    expect(logs[2].timing).toBe(48000);
    expect(logs[2].stamina.before).toBe(29);
    expect(logs[2].stamina.after).toBe(38);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(68400);
    expect(logs[3].stamina.before).toBe(4);
    expect(logs[4].type).toBe('wakeup');
    expect(logs[4].timing).toBe(72000);
    expect(logs[4].stamina.after).toBe(16);
    expect(logs[5].type).toBe('sleep');
    expect(logs[5].timing).toBe(75600);
    expect(logs[5].stamina.before).toBe(10);
    expect(logs.length).toBe(6);
  });
});
