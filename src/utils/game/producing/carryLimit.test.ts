import {describe, expect, it} from '@jest/globals';

import {getCarryLimitMultiplierOfDay} from '@/utils/game/producing/carryLimit';


describe('Pokemon Carry Limit', () => {
  it('gets correct multiplier with single no collect duration', () => {
    const multiplier = getCarryLimitMultiplierOfDay({
      dailyCount: 104.47,
      carryLimit: 30,
      sleepDurations: [28800],
    });

    expect(multiplier).toBeCloseTo(0.95375);
  });

  it('gets correct multiplier with double no collect durations', () => {
    const multiplier = getCarryLimitMultiplierOfDay({
      dailyCount: 104.47,
      carryLimit: 30,
      sleepDurations: [28800, 28800],
    });

    expect(multiplier).toBeCloseTo(0.90766);
  });

  it('gets correct multiplier with lower carry limit', () => {
    // Absol at lv. 60 with Cocoa x 2 / Cocoa x 5 / Mushroom x 7
    const multiplier = getCarryLimitMultiplierOfDay({
      dailyCount: 106.97,
      carryLimit: 14,
      sleepDurations: [3600 * 7.5, 3600],
    });

    expect(multiplier).toBeCloseTo(0.81838);
  });

  it('gets correct multiplier with lower carry limit and longer no collect durations', () => {
    // Absol at lv. 60 with Cocoa x 2 / Cocoa x 5 / Mushroom x 7
    const multiplier = getCarryLimitMultiplierOfDay({
      dailyCount: 106.97,
      carryLimit: 14,
      sleepDurations: [38700],
    });

    expect(multiplier).toBeCloseTo(0.68296);
  });
});
