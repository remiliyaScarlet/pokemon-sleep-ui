import {describe, expect, it} from '@jest/globals';

import {isIngredientCounterEmpty} from '@/utils/game/ingredientCounter';


describe('Ingredient Counter', () => {
  it('is correct with empty object', () => {
    expect(isIngredientCounterEmpty({})).toBeTruthy();
  });

  it('is correct with null values', () => {
    expect(isIngredientCounterEmpty({1: null})).toBeTruthy();
  });

  it('is correct with 0 values', () => {
    expect(isIngredientCounterEmpty({1: 0})).toBeTruthy();
  });

  it('is correct with non-0 values', () => {
    expect(isIngredientCounterEmpty({1: 1})).toBeFalsy();
  });
});
