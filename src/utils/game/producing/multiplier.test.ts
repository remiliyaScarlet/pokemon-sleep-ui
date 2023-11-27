import {describe, expect, it} from '@jest/globals';

import {testBonus} from '@/tests/data/game/bonus';
import {getEnergyMultiplier} from '@/utils/game/producing/multiplier';


describe('Pokemon Energy Multiplier', () => {
  const bonus = testBonus['1'];

  it('is correct', () => {
    const multiplier = getEnergyMultiplier({bonus});

    expect(multiplier).toBeCloseTo(
      (1 + bonus.map / 100) *
      (1 + bonus.overall / 100),
    );
  });
});
