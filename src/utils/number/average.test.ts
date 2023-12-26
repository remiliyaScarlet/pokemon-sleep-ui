import {describe, expect, it} from '@jest/globals';

import {getWeightedAverage} from '@/utils/number/average';


describe('Number / Get Weighted Average', () => {
  it('is correct', () => {
    const result = getWeightedAverage([
      {num: 7, weight: 0.75},
      {num: 4, weight: 1},
    ]);

    expect(result).toBeCloseTo(5.2857);
  });

  it('is correct if `num` are the same', () => {
    const result = getWeightedAverage([
      {num: 7, weight: 0.75},
      {num: 7, weight: 1},
    ]);

    expect(result).toBeCloseTo(7);
  });
});
