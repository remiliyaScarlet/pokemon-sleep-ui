import {describe, expect, it} from '@jest/globals';

import {defaultUserCalculationBehavior} from '@/const/user/settings';
import {testPokemonData} from '@/tests/data/game/pokemon';
import {getBaseFrequencyFromPokemon, getFrequencyFromItemRateOfSessions} from '@/utils/game/producing/frequency';


describe('Pokemon Base Producing Frequency', () => {
  it('is correct for clean Absol', () => {
    const frequency = getBaseFrequencyFromPokemon({
      level: 30,
      subSkillBonus: {},
      pokemon: testPokemonData.absol,
      helperBonusEffect: {
        context: 'single',
        active: false,
      },
      natureId: null,
      behavior: defaultUserCalculationBehavior,
    });

    expect(frequency).toBeCloseTo(2920);
  });

  it('respects good camp ticket calculation behavior', () => {
    const frequency = getBaseFrequencyFromPokemon({
      level: 30,
      subSkillBonus: {},
      pokemon: testPokemonData.absol,
      helperBonusEffect: {
        context: 'single',
        active: false,
      },
      natureId: null,
      behavior: {
        ...defaultUserCalculationBehavior,
        goodCampTicket: true,
      },
    });

    expect(frequency).toBeCloseTo(2433);
  });

  it('is correct calculating helper bonus with team', () => {
    const frequency = getBaseFrequencyFromPokemon({
      level: 30,
      subSkillBonus: {},
      pokemon: testPokemonData.absol,
      helperBonusEffect: {
        context: 'team',
        stack: 3,
      },
      natureId: null,
      behavior: defaultUserCalculationBehavior,
    });

    expect(frequency).toBeCloseTo(2482);
  });

  it('is correct calculating helper bonus as single', () => {
    const frequency = getBaseFrequencyFromPokemon({
      level: 30,
      subSkillBonus: {},
      pokemon: testPokemonData.absol,
      helperBonusEffect: {
        context: 'single',
        active: true,
      },
      natureId: null,
      behavior: defaultUserCalculationBehavior,
    });

    expect(frequency).toBeCloseTo(2252);
  });
});

describe('Item Rate of Sessions Frequency', () => {
  it('is correct for berry', () => {
    const {
      awake,
      sleepVacant,
      sleepFilled,
      equivalent,
      unfilledOnly,
    } = getFrequencyFromItemRateOfSessions({
      produceType: 'berry',
      produceItemSplit: 0.8,
      rate: {
        id: NaN, // Ignored
        awake: {
          id: NaN, // Ignored
          period: 'daily',
          frequency: 1600,
          energy: NaN, // Ignored
          quantity: NaN, // Ignored
        },
        sleep: {
          id: NaN,
          period: 'daily',
          frequency: 2400, // Ignored
          energy: NaN, // Ignored
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
    expect(unfilledOnly).toBeCloseTo(2400);
  });

  it('is correct for ingredient', () => {
    const {
      awake,
      sleepVacant,
      sleepFilled,
      equivalent,
      unfilledOnly,
    } = getFrequencyFromItemRateOfSessions({
      produceType: 'ingredient',
      produceItemSplit: 0.2,
      rate: {
        id: NaN, // Ignored
        awake: {
          id: NaN, // Ignored
          period: 'daily',
          frequency: 1600,
          energy: NaN, // Ignored
          quantity: NaN, // Ignored
        },
        sleep: {
          id: NaN,
          period: 'daily',
          frequency: 2400, // Ignored
          energy: NaN, // Ignored
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
    expect(unfilledOnly).toBeCloseTo(9600);
  });
});
