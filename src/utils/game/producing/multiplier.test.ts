import {describe, expect, it} from '@jest/globals';

import {testBonus} from '@/tests/data/game/bonus';
import {getCommonEnergyMultiplier} from '@/utils/game/producing/multiplier';


describe('Pokemon Energy Multiplier', () => {
  const bonus = testBonus['1'];

  it('is correct', () => {
    const multiplier = getCommonEnergyMultiplier({bonus});

    expect(multiplier).toBeCloseTo(1 + bonus.overall / 100);
  });
});
