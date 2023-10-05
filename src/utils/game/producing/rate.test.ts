import {describe, expect, it} from '@jest/globals';


import {getValueAfterSplitFromItemRateOfSessions} from '@/utils/game/producing/rateReducer';


describe('Pokemon Production Value After Split', () => {
  it('is correct for berry', () => {
    const {awake, sleepVacant, sleepFilled, equivalent} = getValueAfterSplitFromItemRateOfSessions({
      period: 'daily',
      rate: {
        id: NaN, // Ignored
        sleep: {
          id: NaN,
          period: 'daily',
          frequency: NaN, // Ignored
          energy: 500, // Ignored
          quantity: NaN, // Ignored
        },
        awake: {
          id: NaN, // Ignored
          period: 'daily',
          frequency: NaN, // Ignored
          energy: 300, // Ignored
          quantity: NaN, // Ignored
        },
      },
      valueKey: 'energy',
      sleepStateSplit: {
        awake: 16 / 24,
        sleepVacant: 6 / 24,
        sleepFilled: 2 / 24,
      },
      produceType: 'berry',
      produceItemSplit: 0.8,
    });

    expect(awake).toBeCloseTo(300 * 0.8 * (16 / 24));
    expect(sleepVacant).toBeCloseTo(500 * 0.8 * (6 / 24));
    expect(sleepFilled).toBeCloseTo(500 * (2 / 24));
    expect(equivalent).toBeCloseTo((300 * 16 / 24 + 500 * 6 / 24) * 0.8 + (500 * 2 / 24));
  });

  it('is correct for ingredient', () => {
    const {awake, sleepVacant, sleepFilled, equivalent} = getValueAfterSplitFromItemRateOfSessions({
      period: 'daily',
      rate: {
        id: NaN, // Ignored
        sleep: {
          id: NaN,
          period: 'daily',
          frequency: NaN, // Ignored
          energy: 500, // Ignored
          quantity: NaN, // Ignored
        },
        awake: {
          id: NaN, // Ignored
          period: 'daily',
          frequency: NaN, // Ignored
          energy: 300, // Ignored
          quantity: NaN, // Ignored
        },
      },
      valueKey: 'energy',
      sleepStateSplit: {
        awake: 16 / 24,
        sleepVacant: 6 / 24,
        sleepFilled: 2 / 24,
      },
      produceType: 'ingredient',
      produceItemSplit: 0.2,
    });


    expect(awake).toBeCloseTo(300 * 0.2 * (16 / 24));
    expect(sleepVacant).toBeCloseTo(500 * 0.2 * (6 / 24));
    expect(sleepFilled).toBeCloseTo(0);
    expect(equivalent).toBeCloseTo((300 * 16 / 24 + 500 * 6 / 24) * 0.2);
  });
});
