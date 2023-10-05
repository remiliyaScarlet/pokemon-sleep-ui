import {describe, expect, it} from '@jest/globals';


import {toProducingRateOfPeriod} from '@/utils/game/producing/convert';


describe('Pokemon Producing Rate Applicator', () => {
  it('is correct when rate period = desired period', () => {
    const {period, quantity, energy} = toProducingRateOfPeriod({
      period: 'daily',
      rate: {
        period: 'daily',
        quantity: 1,
        energy: 100,
      },
    });

    expect(period).toBe('daily');
    expect(quantity).toBe(1);
    expect(energy).toBe(100);
  });

  it('is correct when rate period is daily and desired period is weekly', () => {
    const {period, quantity, energy} = toProducingRateOfPeriod({
      period: 'weekly',
      rate: {
        period: 'daily',
        quantity: 1,
        energy: 100,
      },
    });

    expect(period).toBe('weekly');
    expect(quantity).toBe(7);
    expect(energy).toBe(700);
  });

  it('is correct when rate period is weekly and desired period is daily', () => {
    const {period, quantity, energy} = toProducingRateOfPeriod({
      period: 'daily',
      rate: {
        period: 'weekly',
        quantity: 7,
        energy: 700,
      },
    });

    expect(period).toBe('daily');
    expect(quantity).toBe(1);
    expect(energy).toBe(100);
  });
});
