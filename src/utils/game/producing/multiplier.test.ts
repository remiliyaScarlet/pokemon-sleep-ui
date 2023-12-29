import {describe, expect, it} from '@jest/globals';

import {testBonus} from '@/tests/data/game/bonus';
import {getCommonEnergyMultiplier, getHelpingBonusSimpleMultiplier} from '@/utils/game/producing/multiplier';


describe('Pokemon Energy Multiplier', () => {
  const bonus = testBonus['1'];

  it('is correct', () => {
    const multiplier = getCommonEnergyMultiplier({bonus});

    expect(multiplier).toBeCloseTo(bonus.overallMultiplier);
  });
});

describe('Pokemon Helping Bonus Simple Multiplier', () => {
  it('is correct', () => {
    const multiplier = getHelpingBonusSimpleMultiplier(5);

    expect(multiplier).toBeCloseTo(1.296177);
  });
});
