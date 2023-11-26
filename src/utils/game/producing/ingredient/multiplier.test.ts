import {describe, expect, it} from '@jest/globals';

import {testMealData} from '@/tests/data/game/meal';
import {getIngredientMultiplier} from '@/utils/game/producing/ingredient/multiplier';


describe('Ingredient Production / Multiplier', () => {
  it('is correct', () => {
    const meals = [testMealData['1007'], testMealData['3006'], testMealData['3006']];
    const rate = getIngredientMultiplier({
      production: {
        2: 18,
        3: 27,
        4: 40,
        5: 20,
      },
      targetMeals: meals,
      recipeLevel: {
        1007: 15,
        3006: 20,
      },
    });

    expect(Object.keys(rate)).toHaveLength(4);
    expect(rate['2']).toBeCloseTo(1);
    expect(rate['3']).toBeCloseTo(1.770395);
    expect(rate['4']).toBeCloseTo(1.0575);
    expect(rate['5']).toBeCloseTo(1.734677);
  });
});
