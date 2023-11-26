import {describe, expect, it} from '@jest/globals';

import {testMealData} from '@/tests/data/game/meal';
import {getMealIngredientInfo} from '@/utils/game/meal/ingredient';


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
