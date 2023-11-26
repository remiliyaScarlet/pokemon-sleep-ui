import {describe, expect, it} from '@jest/globals';

import {testMealData} from '@/tests/data/game/meal';
import {getMealIngredientInfo} from '@/utils/game/meal/ingredient';
import {getIngredientBonusOfMeals} from '@/utils/game/producing/ingredient/bonus';


describe('Ingredient Production / Bonus of Meals', () => {
  it('is correct', () => {
    const meals = [testMealData['1007'], testMealData['3006'], testMealData['3006']];
    const rate = getIngredientBonusOfMeals({
      meals,
      mealIngredientInfo: getMealIngredientInfo({
        meals,
        mealCount: {1007: 1, 3006: 2},
      }),
      recipeLevel: {
        1007: 15,
        3006: 20,
      },
    });

    expect(rate['3']).toBeCloseTo(1.770395);
    expect(rate['4']).toBeCloseTo(1.575);
    expect(rate['5']).toBeCloseTo(1.734677);
    expect(rate['8']).toBeCloseTo(1.8225);
    expect(rate['9']).toBeCloseTo(1.765385);
  });
});
