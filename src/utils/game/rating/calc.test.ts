import {describe, expect, it} from '@jest/globals';

import {defaultProducingParams} from '@/const/game/production';
import {testBerryDataMap} from '@/tests/data/berry';
import {testBonus} from '@/tests/data/bonus';
import {testIngredientChainMap} from '@/tests/data/ingredient/chain';
import {testIngredientMap} from '@/tests/data/ingredient/data';
import {testIngredientProductionAtLevels} from '@/tests/data/ingredient/productionAtLevel';
import {testPokemonData} from '@/tests/data/pokemon';
import {testSubSkillMap} from '@/tests/data/subSkill';
import {calculateRatingResultOfLevel} from '@/utils/game/rating/calc';


describe('Rating / Calculate', () => {
  it('factors in carry limit if the evolution count is changed', () => {
    const result = calculateRatingResultOfLevel({
      level: 30,
      pokemon: testPokemonData.absol,
      evolutionCount: 1,
      bonus: testBonus['1'],
      ingredients: testIngredientProductionAtLevels['1'],
      nature: null,
      pokemonProducingParams: {
        ...defaultProducingParams,
        pokemonId: 359,
        ingredientSplit: 0.2,
      },
      sleepDurations: [28800],
      snorlaxFavorite: {},
      subSkill: {},
      berryDataMap: testBerryDataMap,
      ingredientChainMap: testIngredientChainMap,
      ingredientMap: testIngredientMap,
      subSkillMap: {},
      basis: 'totalProduction',
    });

    expect(result?.baseDiffPercent).not.toBe(0);
  });

  it('factors in carry limit when the level activates subskill bonus', () => {
    const result = calculateRatingResultOfLevel({
      level: 30,
      pokemon: testPokemonData.absol,
      evolutionCount: 0,
      bonus: testBonus['1'],
      ingredients: testIngredientProductionAtLevels['1'],
      nature: null,
      pokemonProducingParams: {
        ...defaultProducingParams,
        pokemonId: 359,
        ingredientSplit: 0.2,
      },
      sleepDurations: [28800],
      snorlaxFavorite: {},
      subSkill: {25: 19},
      berryDataMap: testBerryDataMap,
      ingredientChainMap: testIngredientChainMap,
      ingredientMap: testIngredientMap,
      subSkillMap: testSubSkillMap,
      basis: 'totalProduction',
    });

    expect(result?.baseDiffPercent).not.toBe(0);
  });

  it('factors in carry limit when the level has not activated subskill bonus', () => {
    const result = calculateRatingResultOfLevel({
      level: 15,
      pokemon: testPokemonData.absol,
      evolutionCount: 0,
      bonus: testBonus['1'],
      ingredients: testIngredientProductionAtLevels['1'],
      nature: null,
      pokemonProducingParams: {
        ...defaultProducingParams,
        pokemonId: 359,
        ingredientSplit: 0.2,
      },
      sleepDurations: [28800],
      snorlaxFavorite: {},
      subSkill: {25: 19},
      berryDataMap: testBerryDataMap,
      ingredientChainMap: testIngredientChainMap,
      ingredientMap: testIngredientMap,
      subSkillMap: testSubSkillMap,
      basis: 'totalProduction',
    });

    expect(result?.baseDiffPercent).toBe(0);
  });
});
