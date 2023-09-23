import {describe, expect, it} from '@jest/globals';

import {getCarryLimitMultiplier} from '@/utils/game/producing/carryLimit';


describe('Pokemon Carry Limit', () => {
  it('gets correct multiplier with single no collect duration', () => {
    const multiplier = getCarryLimitMultiplier({
      dailyCount: 104.47,
      carryLimit: 30,
      noCollectDurations: [28800],
    });

    expect(multiplier).toBeCloseTo(0.86149);
  });

  it('gets correct multiplier with double no collect durations', () => {
    const multiplier = getCarryLimitMultiplier({
      dailyCount: 104.47,
      carryLimit: 30,
      noCollectDurations: [28800, 28800],
    });

    expect(multiplier).toBeCloseTo(0.43075);
  });

  it('gets correct multiplier with lower carry limit', () => {
    // Absol at lv. 60 with Cocoa x 2 / Cocoa x 5 / Mushroom x 7
    const multiplier = getCarryLimitMultiplier({
      dailyCount: 106.97,
      carryLimit: 14,
      noCollectDurations: [3600 * 7.5, 3600],
    });

    expect(multiplier).toBeCloseTo(0.36954);
  });

  it('gets correct multiplier with lower carry limit and longer no collect durations', () => {
    // Absol at lv. 60 with Cocoa x 2 / Cocoa x 5 / Mushroom x 7
    const multiplier = getCarryLimitMultiplier({
      dailyCount: 106.97,
      carryLimit: 14,
      noCollectDurations: [38700],
    });

    expect(multiplier).toBeCloseTo(0.29219);
  });
});
