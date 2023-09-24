import {describe, expect, it} from '@jest/globals';


import {getValueAfterSplitFromItemSessionRate} from '@/utils/game/producing/rateReducer';


describe('Pokemon Production Value After Split', () => {
  it('is correct for berry', () => {
    const value = getValueAfterSplitFromItemSessionRate({
      rate: {
        id: NaN, // Ignored
        sleep: {
          id: NaN,
          frequency: NaN, // Ignored
          dailyEnergy: 500, // Ignored
          quantity: NaN, // Ignored
        },
        awake: {
          id: NaN, // Ignored
          frequency: NaN, // Ignored
          dailyEnergy: 300, // Ignored
          quantity: NaN, // Ignored
        },
      },
      valueKey: 'dailyEnergy',
      sleepStateSplit: {
        awake: 16 / 24,
        sleepVacant: 6 / 24,
        sleepFilled: 2 / 24,
      },
      produceType: 'berry',
      produceItemSplit: 0.8,
    });

    expect(value).toBeCloseTo((300 * 16 / 24 + 500 * 6 / 24) * 0.8 + (500 * 2 / 24));
  });

  it('is correct for ingredient', () => {
    const value = getValueAfterSplitFromItemSessionRate({
      rate: {
        id: NaN, // Ignored
        sleep: {
          id: NaN,
          frequency: NaN, // Ignored
          dailyEnergy: 500, // Ignored
          quantity: NaN, // Ignored
        },
        awake: {
          id: NaN, // Ignored
          frequency: NaN, // Ignored
          dailyEnergy: 300, // Ignored
          quantity: NaN, // Ignored
        },
      },
      valueKey: 'dailyEnergy',
      sleepStateSplit: {
        awake: 16 / 24,
        sleepVacant: 6 / 24,
        sleepFilled: 2 / 24,
      },
      produceType: 'ingredient',
      produceItemSplit: 0.2,
    });

    expect(value).toBeCloseTo((300 * 16 / 24 + 500 * 6 / 24) * 0.2);
  });
});
