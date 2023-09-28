import {describe, expect, it} from '@jest/globals';

import {testPokemonData} from '@/tests/data/pokemon';
import {getFrequencyFromItemRateOfSessions, getBaseFrequencyFromPokemon} from '@/utils/game/producing/frequency';


describe('Pokemon Base Producing Frequency', () => {
  it('is correct for clean Absol', () => {
    const frequency = getBaseFrequencyFromPokemon({
      level: 30,
      subSkillBonus: {},
      pokemon: testPokemonData.absol,
      helperCount: 0,
      natureId: null,
    });

    expect(frequency).toBeCloseTo(2920.2);
  });
});

describe('Item Rate of Sessions Frequency', () => {
  it('is correct for berry', () => {
    const frequency = getFrequencyFromItemRateOfSessions({
      produceType: 'berry',
      produceItemSplit: 0.8,
      rate: {
        id: NaN, // Ignored
        awake: {
          id: NaN, // Ignored
          frequency: 1600,
          dailyEnergy: NaN, // Ignored
          quantity: NaN, // Ignored
        },
        sleep: {
          id: NaN,
          frequency: 2400, // Ignored
          dailyEnergy: NaN, // Ignored
          quantity: NaN, // Ignored
        },
      },
      sleepStateSplit: {
        awake: 16 / 24,
        sleepVacant: 6 / 24,
        sleepFilled: 2 / 24,
      },
    });

    expect(frequency).toBeCloseTo(2250);
  });

  it('is correct for ingredient', () => {
    const frequency = getFrequencyFromItemRateOfSessions({
      produceType: 'ingredient',
      produceItemSplit: 0.2,
      rate: {
        id: NaN, // Ignored
        awake: {
          id: NaN, // Ignored
          frequency: 1600,
          dailyEnergy: NaN, // Ignored
          quantity: NaN, // Ignored
        },
        sleep: {
          id: NaN,
          frequency: 2400, // Ignored
          dailyEnergy: NaN, // Ignored
          quantity: NaN, // Ignored
        },
      },
      sleepStateSplit: {
        awake: 16 / 24,
        sleepVacant: 6 / 24,
        sleepFilled: 2 / 24,
      },
    });

    expect(frequency).toBeCloseTo(9600);
  });
});
