import {describe, expect, it} from '@jest/globals';

import {StaminaEventLog} from '@/types/game/producing/stamina';
import {getStaminaEventLogsFlattened} from '@/ui/stamina/utils';


describe('Stamina Analysis / Event Log Flattening', () => {
  const originalLogs: StaminaEventLog[] = [
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
      stamina: {before: 61, after: 61},
      staminaUnderlying: {before: 61, after: 61},
    },
  ];

  it('is correct', () => {
    const logs = getStaminaEventLogsFlattened(originalLogs);

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina).toBe(100);
    expect(logs[1].type).toBe(null);
    expect(logs[1].timing).toBe(600);
    expect(logs[1].stamina).toBe(99);
    expect(logs[2].type).toBe(null);
    expect(logs[2].timing).toBe(1200);
    expect(logs[2].stamina).toBe(98);
    expect(logs[20].type).toBe('efficiencyBlock');
    expect(logs[20].timing).toBe(12000);
    expect(logs[20].stamina).toBe(80);
    expect(logs[32].type).toBe('skillRecovery');
    expect(logs[32].timing).toBe(19200);
    expect(logs[32].stamina).toBe(68);
    expect(logs[33].type).toBe('skillRecovery');
    expect(logs[33].timing).toBe(19200);
    expect(logs[33].stamina).toBe(86);
    expect(logs[34].type).toBe(null);
    expect(logs[34].timing).toBe(19800);
    expect(logs[34].stamina).toBe(85);
    expect(logs[58].type).toBe('sleep');
    expect(logs[58].timing).toBe(34200);
    expect(logs[58].stamina).toBe(61);
  });

  it('is sorted by timing', () => {
    const logs = getStaminaEventLogsFlattened(originalLogs);

    const timingDiff = [...new Array(logs.length - 1).keys()]
      .map((idx) => logs[idx + 1].timing - logs[idx].timing);

    expect(timingDiff.some((diff) => diff < 0)).toBeFalsy();
  });
});
