import {describe, expect, it} from '@jest/globals';

import {testMealData} from '@/tests/data/game/meal';
import {getMealIngredientInfo, getMealIngredientInfoFromTargetMeals} from '@/utils/game/meal/ingredient';


describe('Meal / Ingredient Info', () => {
  // Test data sourced from https://github.com/RaenonX-PokemonSleep/pokemon-sleep-ui/issues/410
  it('is correct', () => {
    const meals = [testMealData['1007'], testMealData['3006'], testMealData['3006']];
    const info = getMealIngredientInfo({
      meals,
      mealCount: {
        1007: 1,
        3006: 2,
      },
    });

    expect(info.ingredientOfMeals).toMatchObject({
      3: {
        1007: 8,
        3006: 30,
      },
      4: {
        1007: 4,
      },
      5: {
        1007: 11,
        3006: 20,
      },
      8: {
        3006: 20,
      },
      9: {
        1007: 12,
        3006: 40,
      },
    });
    expect(info.ingredientsRequired).toMatchObject({
      3: 38,
      4: 4,
      5: 31,
      8: 20,
      9: 52,
    });
  });
});

describe('Meal / Ingredient Info from Target Meals', () => {
  it('is correct', () => {
    const targetMeals = [testMealData['1007'], testMealData['3006'], testMealData['3006']];
    const info = getMealIngredientInfoFromTargetMeals({
      targetMeals,
      days: 7,
    });

    expect(info.ingredientOfMeals).toMatchObject({
      3: {
        1007: 8 * 7,
        3006: 30 * 7,
      },
      4: {
        1007: 4 * 7,
      },
      5: {
        1007: 11 * 7,
        3006: 20 * 7,
      },
      8: {
        3006: 20 * 7,
      },
      9: {
        1007: 12 * 7,
        3006: 40 * 7,
      },
    });
    expect(info.ingredientsRequired).toMatchObject({
      3: 38 * 7,
      4: 4 * 7,
      5: 31 * 7,
      8: 20 * 7,
      9: 52 * 7,
    });
  });
});
