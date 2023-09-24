import {describe, expect, it} from '@jest/globals';

import {testPokemonData} from '@/tests/data/pokemon';
import {getFrequencyFromPokemon} from '@/utils/game/producing/frequency';


describe('Pokemon Producing Frequency', () => {
  it('is correct for clean Absol', () => {
    const frequency = getFrequencyFromPokemon({
      level: 30,
      subSkillBonus: {},
      pokemon: testPokemonData.absol,
      helperCount: 0,
      natureId: null,
    });

    expect(frequency).toBeCloseTo(2920.2);
  });
});
