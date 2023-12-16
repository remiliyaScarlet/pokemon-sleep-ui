import {describe, expect, it} from '@jest/globals';

import {testMealData} from '@/tests/data/game/meal';
import {getMealCoverage} from '@/utils/game/cooking';


describe('Cooking / Meal Coverage', () => {
  it('is correct using daily production', () => {
    const result = getMealCoverage({
      meals: [testMealData['1007'], testMealData['3006'], testMealData['3006']],
      ingredientProduction: {
        3: 19,
        4: 2,
        5: 15.5,
        8: 10,
        9: 26,
      },
      period: 'daily',
    });

    expect(result).toBeCloseTo(0.5);
  });

  it('is correct using weekly production', () => {
    const result = getMealCoverage({
      meals: [testMealData['1007'], testMealData['3006'], testMealData['3006']],
      ingredientProduction: {
        3: 19 * 7,
        4: 2 * 7,
        5: 15.5 * 7,
        8: 10 * 7,
        9: 26 * 7,
      },
      period: 'weekly',
    });

    expect(result).toBeCloseTo(0.5);
  });

  it('does not go beyond 1', () => {
    const result = getMealCoverage({
      meals: [testMealData['1007'], testMealData['3006'], testMealData['3006']],
      ingredientProduction: {
        3: 38 * 7,
        4: 4 * 7,
        5: 31 * 7,
        8: 20 * 7,
        9: 52 * 7,
      },
      period: 'daily',
    });

    expect(result).toBeCloseTo(1);
  });
});
