import {describe, expect, it} from '@jest/globals';

import {durationOfDay} from '@/const/common';
import {testBonus} from '@/tests/data/bonus';
import {testIngredientMap} from '@/tests/data/ingredient';
import {testPokemonData} from '@/tests/data/pokemon';
import {getIngredientProducingRates} from '@/utils/game/producing/ingredients';
import {getEnergyMultiplier} from '@/utils/game/producing/multiplier';


describe('Pokemon Ingredients Production', () => {
  it('is correct for Absol of Cocoa x 2; Apple x 8', () => {
    const bonus = testBonus['1'];
    const rate = getIngredientProducingRates({
      level: 30,
      pokemon: testPokemonData.absol,
      frequency: 2920.2,
      bonus,
      ingredients: [
        {id: 13, qty: 2}, {id: 5, qty: 8},
      ],
      ingredientMap: testIngredientMap,
    });

    const awakeFreq = 2920.2 / bonus.stamina.awake;
    const sleepFreq = 2920.2 / bonus.stamina.sleep;
    const energyMultiplier = getEnergyMultiplier({produceType: 'ingredient', bonus});

    const first = rate[0];
    const second = rate[1];

    expect(first.id).toBe(5);
    expect(first.awake.id).toBe(5);
    expect(first.awake.frequency).toBeCloseTo(awakeFreq);
    expect(first.awake.quantity).toBeCloseTo(durationOfDay / awakeFreq * (8 / 2));
    expect(first.awake.dailyEnergy).toBeCloseTo(durationOfDay / awakeFreq * (8 / 2) * 90 * energyMultiplier);
    expect(first.sleep.id).toBe(5);
    expect(first.sleep.frequency).toBeCloseTo(sleepFreq);
    expect(first.sleep.quantity).toBeCloseTo(durationOfDay / sleepFreq * (8 / 2));
    expect(first.sleep.dailyEnergy).toBeCloseTo(durationOfDay / sleepFreq * (8 / 2) * 90 * energyMultiplier);
    expect(second.id).toBe(13);
    expect(second.awake.id).toBe(13);
    expect(second.awake.frequency).toBeCloseTo(awakeFreq);
    expect(second.awake.quantity).toBeCloseTo(durationOfDay / awakeFreq * (2 / 2));
    expect(second.awake.dailyEnergy).toBeCloseTo(durationOfDay / awakeFreq * (2 / 2) * 151 * energyMultiplier);
    expect(second.sleep.id).toBe(13);
    expect(second.sleep.frequency).toBeCloseTo(sleepFreq);
    expect(second.sleep.quantity).toBeCloseTo(durationOfDay / sleepFreq * (2 / 2));
    expect(second.sleep.dailyEnergy).toBeCloseTo(durationOfDay / sleepFreq * (2 / 2) * 151 * energyMultiplier);
  });
});
