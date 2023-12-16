import {describe, expect, it} from '@jest/globals';

import {capIngredientCount, isIngredientCounterEmpty} from '@/utils/game/ingredientCounter';


describe('Ingredient Counter / Is Empty', () => {
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

describe('Ingredient Counter / Cap', () => {
  it('does not cap if `max` is empty', () => {
    expect(capIngredientCount({}, {1: 10})).toMatchObject({1: 10});
  });

  it('returns empty object if `target` is empty', () => {
    expect(capIngredientCount({1: 10}, {})).toMatchObject({});
  });

  it('correctly caps', () => {
    expect(capIngredientCount({1: 10}, {1: 12})).toMatchObject({1: 10});
    expect(capIngredientCount({1: 10}, {1: 12, 2: 20})).toMatchObject({1: 10, 2: 20});
    expect(capIngredientCount({1: 10, 2: 5}, {1: 12})).toMatchObject({1: 10});
  });
});
