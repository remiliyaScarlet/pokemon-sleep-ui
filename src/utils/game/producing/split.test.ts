import {describe, expect, it} from '@jest/globals';

import {specialtyIdMap} from '@/const/game/pokemon';
import {defaultProducingParams} from '@/const/game/production';
import {defaultUserCalculationBehavior} from '@/const/user/settings';
import {getProduceSplit, getProducingSleepStateSplit} from '@/utils/game/producing/split';


describe('Pokemon Producing Split', () => {
  it('is correct with given params', () => {
    const split = getProduceSplit({
      specialty: null,
      pokemonProducingParams: {
        ...defaultProducingParams,
        pokemonId: 1,
        ingredientSplit: 0.25631,
      },
      natureId: null,
      subSkillBonus: {},
      behavior: defaultUserCalculationBehavior,
    });

    expect(split.berry).toBeCloseTo(0.74369);
    expect(split.ingredient).toBeCloseTo(0.25631);
  });

  it('respects `behavior` with berry specialty', () => {
    const split = getProduceSplit({
      specialty: specialtyIdMap.berry,
      pokemonProducingParams: {
        ...defaultProducingParams,
        pokemonId: 1,
        ingredientSplit: 0.25631,
      },
      natureId: null,
      subSkillBonus: {},
      behavior: {
        ...defaultUserCalculationBehavior,
        alwaysFullPack: 'berryOnly',
      },
    });

    expect(split.berry).toBeCloseTo(1);
    expect(split.ingredient).toBeCloseTo(0);
  });

  it('respects `behavior` with ingredient specialty', () => {
    const split = getProduceSplit({
      specialty: specialtyIdMap.ingredient,
      pokemonProducingParams: {
        ...defaultProducingParams,
        pokemonId: 1,
        ingredientSplit: 0.25631,
      },
      natureId: null,
      subSkillBonus: {},
      behavior: defaultUserCalculationBehavior,
    });

    expect(split.berry).toBeCloseTo(0.74369);
    expect(split.ingredient).toBeCloseTo(0.25631);
  });
});

describe('Pokemon Producing Sleep State Split', () => {
  it('is correct', () => {
    const split = getProducingSleepStateSplit({
      sleepDurationTotal: 8 * 3600,
      fullPackRatioInSleep: 1 / 4,
    });

    expect(split.awake).toBeCloseTo(16 / 24);
    expect(split.sleepVacant).toBeCloseTo(6 / 24);
    expect(split.sleepFilled).toBeCloseTo(2 / 24);
  });
});
