import {describe, expect, it} from '@jest/globals';

import {durationOfDay} from '@/const/common';
import {testBerryData} from '@/tests/data/berry';
import {testBonus} from '@/tests/data/bonus';
import {testPokemonData} from '@/tests/data/pokemon';
import {getBerryProducingRate} from '@/utils/game/producing/berry';
import {getEnergyMultiplier} from '@/utils/game/producing/multiplier';


describe('Pokemon Berry Production', () => {
  it('is correct for clean Absol', () => {
    const bonus = testBonus['1'];
    const rate = getBerryProducingRate({
      level: 30,
      pokemon: testPokemonData.absol,
      frequency: 2920.2,
      subSkillBonus: {},
      bonus,
      snorlaxFavorite: {},
      berryData: testBerryData['16'],
    });

    const awakeFreq = 2920.2 / bonus.stamina.awake;
    const sleepFreq = 2920.2 / bonus.stamina.sleep;
    const berryEnergy = 63;
    const energyMultiplier = getEnergyMultiplier({produceType: 'berry', bonus});

    expect(rate.id).toBe(testPokemonData.absol.berry.id);
    expect(rate.awake.id).toBe(testPokemonData.absol.berry.id);
    expect(rate.awake.frequency).toBeCloseTo(awakeFreq);
    expect(rate.awake.quantity).toBeCloseTo(durationOfDay / awakeFreq);
    expect(rate.awake.dailyEnergy).toBeCloseTo(durationOfDay / awakeFreq * berryEnergy * energyMultiplier);
    expect(rate.sleep.id).toBe(testPokemonData.absol.berry.id);
    expect(rate.sleep.frequency).toBeCloseTo(sleepFreq);
    expect(rate.sleep.quantity).toBeCloseTo(durationOfDay / sleepFreq);
    expect(rate.sleep.dailyEnergy).toBeCloseTo(durationOfDay / sleepFreq * berryEnergy * energyMultiplier);
  });
});
