import {describe, expect, it} from '@jest/globals';

import {testBonus} from '@/tests/data/game/bonus';
import {getCommonEnergyMultiplier, getHelperBonusSimpleMultiplier} from '@/utils/game/producing/multiplier';


describe('Pokemon Energy Multiplier', () => {
  const bonus = testBonus['1'];

  it('is correct', () => {
    const multiplier = getCommonEnergyMultiplier({bonus});

    expect(multiplier).toBeCloseTo(bonus.overallMultiplier);
  });
});

describe('Pokemon Helper Bonus Simple Multiplier', () => {
  it('is correct', () => {
    const multiplier = getHelperBonusSimpleMultiplier(5);

    expect(multiplier).toBeCloseTo(1.296177);
  });
});
