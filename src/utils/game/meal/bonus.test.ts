import {describe, expect, it} from '@jest/globals';

import {recipeMaxLevel} from '@/const/game/meal';
import {testMealData} from '@/tests/data/game/meal';
import {getCommonMaxMealBonus} from '@/utils/game/meal/bonus';


describe('Meal / Max Common Meal Bonus', () => {
  it('is correct', () => {
    const maxBonus = getCommonMaxMealBonus({
      level: recipeMaxLevel,
      meals: [testMealData['1003'], testMealData['1007'], testMealData['3006']],
    });

    expect(maxBonus).toBeCloseTo(1.35 * 2.48);
  });
});
