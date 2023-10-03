import {describe, expect, it} from '@jest/globals';

import {testBerryDataMap} from '@/tests/data/berry';
import {testBonus} from '@/tests/data/bonus';
import {testIngredientChainMap} from '@/tests/data/ingredient/chain';
import {testIngredientMap} from '@/tests/data/ingredient/data';
import {testIngredientProductionAtLevels} from '@/tests/data/ingredient/productionAtLevel';
import {testPokemonData} from '@/tests/data/pokemon';
import {calculateRatingResultOfLevel} from '@/utils/game/rating';


describe('Rating', () => {
  it('factors in carry limit', () => {
    const result = calculateRatingResultOfLevel({
      level: 30,
      pokemon: testPokemonData.absol,
      carryLimit: 19,
      bonus: testBonus['1'],
      ingredients: testIngredientProductionAtLevels['1'],
      nature: null,
      pokemonProducingParams: {
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
    });

    expect(result?.baseDiffPercent).not.toBe(0);
  });
});
