import {describe, expect, it} from '@jest/globals';

import {testPokemonData} from '@/tests/data/game/pokemon';
import {
  getCarryLimitInfo,
  getFullPackStats,
  getTheoreticalDailyQuantityInSleep,
} from '@/utils/game/producing/carryLimit';


describe('Pokemon Carry Limit Info', () => {
  it('gets correct info for clean Pokemon', () => {
    const {base, final} = getCarryLimitInfo({
      pokemon: testPokemonData.absol,
      evolutionCount: 0,
      subSkillBonus: {},
    });

    expect(base).toBeCloseTo(testPokemonData.absol.stats.maxCarry);
    expect(final).toBeCloseTo(testPokemonData.absol.stats.maxCarry);
  });

  it('gets correct info for evolved Pokemon', () => {
    const {base, final} = getCarryLimitInfo({
      pokemon: testPokemonData.absol,
      evolutionCount: 2,
      subSkillBonus: {},
    });

    expect(base).toBeCloseTo(testPokemonData.absol.stats.maxCarry + 2 * 5);
    expect(final).toBeCloseTo(testPokemonData.absol.stats.maxCarry + 2 * 5);
  });

  it('gets correct info for Pokemon with carry limit subskill', () => {
    const {base, final} = getCarryLimitInfo({
      pokemon: testPokemonData.absol,
      evolutionCount: 0,
      subSkillBonus: {
        inventory: [18],
      },
    });

    expect(base).toBeCloseTo(testPokemonData.absol.stats.maxCarry);
    expect(final).toBeCloseTo(testPokemonData.absol.stats.maxCarry + 18);
  });
});

describe('Pokemon Full Pack Stats', () => {
  it('gets correct stats with single no collect duration', () => {
    const {ratio, secondsToFull} = getFullPackStats({
      dailyCount: 104.47,
      carryLimit: 30,
      sleepDurations: [28800],
    });

    expect(secondsToFull).toBeCloseTo(24810.9505);
    expect(ratio).toBeCloseTo(0.13851);
  });

  it('gets correct stats with double no collect durations', () => {
    const {ratio, secondsToFull} = getFullPackStats({
      dailyCount: 104.47,
      carryLimit: 30,
      sleepDurations: [28800, 28800],
    });

    expect(secondsToFull).toBeCloseTo(24810.9505);
    expect(ratio).toBeCloseTo(0.13851);
  });

  it('gets correct stats with lower carry limit', () => {
    // Absol at lv. 60 with Cocoa x 2 / Cocoa x 5 / Mushroom x 7
    const {ratio, secondsToFull} = getFullPackStats({
      dailyCount: 106.97,
      carryLimit: 14,
      sleepDurations: [3600 * 7.5, 3600],
    });

    expect(secondsToFull).toBeCloseTo(11307.8433);
    expect(ratio).toBeCloseTo(0.51282);
  });

  it('gets correct stats with lower carry limit and longer no collect durations', () => {
    // Absol at lv. 60 with Cocoa x 2 / Cocoa x 5 / Mushroom x 7
    const {ratio, secondsToFull} = getFullPackStats({
      dailyCount: 106.97,
      carryLimit: 14,
      sleepDurations: [38700],
    });

    expect(secondsToFull).toBeCloseTo(11307.8433);
    expect(ratio).toBeCloseTo(0.70781);
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
            period: 'daily',
            frequency: NaN, // Ignored
            energy: NaN, // Ignored
            quantity: 75,
          },
          awake: {
            id: NaN, // Ignored
            period: 'daily',
            frequency: NaN, // Ignored
            energy: NaN, // Ignored
            quantity: NaN, // Ignored
          },
        },
        ingredient: [
          {
            id: NaN, // Ignored
            sleep: {
              id: NaN,
              period: 'daily',
              frequency: NaN, // Ignored
              energy: NaN, // Ignored
              quantity: 40,
            },
            awake: {
              id: NaN, // Ignored
              period: 'daily',
              frequency: NaN, // Ignored
              energy: NaN, // Ignored
              quantity: NaN, // Ignored
            },
          },
          {
            id: NaN, // Ignored
            sleep: {
              id: NaN,
              period: 'daily',
              frequency: NaN, // Ignored
              energy: NaN, // Ignored
              quantity: 20,
            },
            awake: {
              id: NaN, // Ignored
              period: 'daily',
              frequency: NaN, // Ignored
              energy: NaN, // Ignored
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

  it('is correct with weekly rate', () => {
    const quantity = getTheoreticalDailyQuantityInSleep({
      rate: {
        berry: {
          id: NaN, // Ignored
          sleep: {
            id: NaN,
            period: 'weekly',
            frequency: NaN, // Ignored
            energy: NaN, // Ignored
            quantity: 75,
          },
          awake: {
            id: NaN, // Ignored
            period: 'weekly',
            frequency: NaN, // Ignored
            energy: NaN, // Ignored
            quantity: NaN, // Ignored
          },
        },
        ingredient: [
          {
            id: NaN, // Ignored
            sleep: {
              id: NaN,
              period: 'weekly',
              frequency: NaN, // Ignored
              energy: NaN, // Ignored
              quantity: 40,
            },
            awake: {
              id: NaN, // Ignored
              period: 'weekly',
              frequency: NaN, // Ignored
              energy: NaN, // Ignored
              quantity: NaN, // Ignored
            },
          },
          {
            id: NaN, // Ignored
            sleep: {
              id: NaN,
              period: 'weekly',
              frequency: NaN, // Ignored
              energy: NaN, // Ignored
              quantity: 20,
            },
            awake: {
              id: NaN, // Ignored
              period: 'weekly',
              frequency: NaN, // Ignored
              energy: NaN, // Ignored
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

    expect(quantity).toBeCloseTo((75 * 0.85 + (40 + 20) * 0.15) / 7);
  });
});
