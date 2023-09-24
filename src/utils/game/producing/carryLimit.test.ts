import {describe, expect, it} from '@jest/globals';

import {getFullPackRatioInSleep, getTheoreticalDailyQuantityInSleep} from '@/utils/game/producing/carryLimit';


describe('Pokemon Full Pack Ratio in Sleep', () => {
  it('gets correct multiplier with single no collect duration', () => {
    const multiplier = getFullPackRatioInSleep({
      dailyCount: 104.47,
      carryLimit: 30,
      sleepDurations: [28800],
    });

    expect(multiplier).toBeCloseTo(0.13851);
  });

  it('gets correct multiplier with double no collect durations', () => {
    const multiplier = getFullPackRatioInSleep({
      dailyCount: 104.47,
      carryLimit: 30,
      sleepDurations: [28800, 28800],
    });

    expect(multiplier).toBeCloseTo(0.13851);
  });

  it('gets correct multiplier with lower carry limit', () => {
    // Absol at lv. 60 with Cocoa x 2 / Cocoa x 5 / Mushroom x 7
    const multiplier = getFullPackRatioInSleep({
      dailyCount: 106.97,
      carryLimit: 14,
      sleepDurations: [3600 * 7.5, 3600],
    });

    expect(multiplier).toBeCloseTo(0.51282);
  });

  it('gets correct multiplier with lower carry limit and longer no collect durations', () => {
    // Absol at lv. 60 with Cocoa x 2 / Cocoa x 5 / Mushroom x 7
    const multiplier = getFullPackRatioInSleep({
      dailyCount: 106.97,
      carryLimit: 14,
      sleepDurations: [38700],
    });

    expect(multiplier).toBeCloseTo(0.70781);
  });
});

describe('Pokemon Theoretical Daily Quantity in Sleep', () => {
  it('is correct', () => {
    const quantity = getTheoreticalDailyQuantityInSleep({
      rate: {
        berry: {
          id: NaN, // Ignored
          sleep: {
            id: NaN,
            frequency: NaN, // Ignored
            dailyEnergy: NaN, // Ignored
            quantity: 75,
          },
          awake: {
            id: NaN, // Ignored
            frequency: NaN, // Ignored
            dailyEnergy: NaN, // Ignored
            quantity: NaN, // Ignored
          },
        },
        ingredient: [
          {
            id: NaN, // Ignored
            sleep: {
              id: NaN,
              frequency: NaN, // Ignored
              dailyEnergy: NaN, // Ignored
              quantity: 40,
            },
            awake: {
              id: NaN, // Ignored
              frequency: NaN, // Ignored
              dailyEnergy: NaN, // Ignored
              quantity: NaN, // Ignored
            },
          },
          {
            id: NaN, // Ignored
            sleep: {
              id: NaN,
              frequency: NaN, // Ignored
              dailyEnergy: NaN, // Ignored
              quantity: 20,
            },
            awake: {
              id: NaN, // Ignored
              frequency: NaN, // Ignored
              dailyEnergy: NaN, // Ignored
              quantity: NaN, // Ignored
            },
          },
        ],
      },
      produceSplit: {
        berry: 0.85,
        ingredient: 0.15,
      },
    });

    expect(quantity).toBeCloseTo(75 * 0.85 + (40 + 20) * 0.15);
  });
});
