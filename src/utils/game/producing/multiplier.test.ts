import {describe, expect, it} from '@jest/globals';

import {testBonus} from '@/tests/data/bonus';
import {getEnergyMultiplier} from '@/utils/game/producing/multiplier';


describe('Pokemon Energy Multiplier', () => {
  const bonus = testBonus['1'];

  it('is correct for berry', () => {
    const multiplier = getEnergyMultiplier({
      produceType: 'berry',
      bonus,
    });

    expect(multiplier).toBeCloseTo((1 + bonus.map / 100) * (1 + bonus.overall / 100));
  });

  it('is correct for ingredient', () => {
    const multiplier = getEnergyMultiplier({
      produceType: 'ingredient',
      bonus,
    });

    expect(multiplier).toBeCloseTo(
      (1 + bonus.map / 100) *
      (1 + bonus.overall / 100) *
      (1 + bonus.ingredient / 100),
    );
  });
});
