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
    const {awake, sleepVacant, sleepFilled, equivalent} = getFrequencyFromItemRateOfSessions({
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

    expect(awake).toBeCloseTo(2000);
    expect(sleepVacant).toBeCloseTo(3000);
    expect(sleepFilled).toBeCloseTo(2400);
    expect(equivalent).toBeCloseTo(2215.38);
  });

  it('is correct for ingredient', () => {
    const {awake, sleepVacant, sleepFilled, equivalent} = getFrequencyFromItemRateOfSessions({
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


    expect(awake).toBeCloseTo(8000);
    expect(sleepVacant).toBeCloseTo(12000);
    expect(sleepFilled).toBeCloseTo(Infinity);
    expect(equivalent).toBeCloseTo(9600);
  });
});
