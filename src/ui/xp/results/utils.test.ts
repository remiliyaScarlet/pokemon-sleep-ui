import {describe, expect, it} from '@jest/globals';

import {getCandiesRequired} from '@/ui/xp/results/utils';


describe('EXP Calculator / Candies Required', () => {
  it('is correct for > 1 multiplier / XP to next > the bound', () => {
    const candiesRequired = getCandiesRequired({
      expToNext: 31,
      multiplier: 1.18,
      ownedCandies: 0,
    });

    expect(Math.ceil(candiesRequired)).toBe(2);
  });

  it('is correct for > 1 multiplier / XP to next < the bound', () => {
    const candiesRequired = getCandiesRequired({
      expToNext: 30,
      multiplier: 1.18,
      ownedCandies: 0,
    });

    expect(Math.ceil(candiesRequired)).toBe(1);
  });

  it('is correct for < 1 multiplier and XP to next > the bound', () => {
    const candiesRequired = getCandiesRequired({
      expToNext: 22,
      multiplier: 0.82,
      ownedCandies: 0,
    });

    expect(Math.ceil(candiesRequired)).toBe(2);
  });

  it('is correct for < 1 multiplier and XP to next < the bound', () => {
    const candiesRequired = getCandiesRequired({
      expToNext: 21,
      multiplier: 0.82,
      ownedCandies: 0,
    });

    expect(Math.ceil(candiesRequired)).toBe(1);
  });

  it('is correct for large EXP to next with < 1 multiplier', () => {
    const candiesRequired = getCandiesRequired({
      expToNext: 1435,
      multiplier: 0.82,
      ownedCandies: 0,
    });

    expect(Math.ceil(candiesRequired)).toBe(69);
  });

  it('is correct for large EXP to next with > 1 multiplier', () => {
    const candiesRequired = getCandiesRequired({
      expToNext: 11850,
      multiplier: 1.18,
      ownedCandies: 0,
    });

    expect(Math.ceil(candiesRequired)).toBe(395);
  });

  it('with owned candies', () => {
    const candiesRequired = getCandiesRequired({
      expToNext: 1435,
      multiplier: 0.82,
      ownedCandies: 10,
    });

    expect(Math.ceil(candiesRequired)).toBe(59);
  });
});
