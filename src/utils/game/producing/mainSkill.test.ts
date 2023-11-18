import {describe, expect, it} from '@jest/globals';

import {durationOfDay} from '@/const/common';
import {testBonus} from '@/tests/data/game/bonus';
import {testMainSkillMap} from '@/tests/data/game/mainSkill';
import {testPokemonData} from '@/tests/data/game/pokemon';
import {getMainSkillProducingRate} from '@/utils/game/producing/mainSkill';
import {getEnergyMultiplier} from '@/utils/game/producing/multiplier';


describe('Pokemon Skill Production', () => {
  it('is correct using general test data', () => {
    const bonus = testBonus['1'];
    const rate = getMainSkillProducingRate({
      pokemon: testPokemonData.absol,
      frequency: 2920.2,
      bonus,
      subSkillBonus: {},
      skillRatePercent: 5,
      natureId: null,
      skillLevel: 2,
      skillData: testMainSkillMap['1'],
    });

    const awakeFreq = 2920.2 / bonus.stamina.awake;
    const sleepFreq = 2920.2 / bonus.stamina.sleep;
    const energyMultiplier = getEnergyMultiplier({produceType: 'skill', bonus});

    expect(rate.id).toBe(1);
    expect(rate.awake.id).toBe(1);
    expect(rate.awake.frequency).toBeCloseTo(awakeFreq * 20);
    expect(rate.awake.quantity).toBeCloseTo(durationOfDay / awakeFreq / 20);
    expect(rate.awake.energy).toBeCloseTo(durationOfDay / awakeFreq / 20 * energyMultiplier * 569);
    expect(rate.sleep.id).toBe(1);
    expect(rate.sleep.frequency).toBeCloseTo(sleepFreq * 20);
    expect(rate.sleep.quantity).toBeCloseTo(durationOfDay / sleepFreq / 20);
    expect(rate.sleep.energy).toBeCloseTo(durationOfDay / sleepFreq / 20 * energyMultiplier * 569);
  });
});
