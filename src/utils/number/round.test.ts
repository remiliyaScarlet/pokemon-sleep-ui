import {describe, expect, it} from '@jest/globals';

import {roundDown} from '@/utils/number/round';


describe('Number / Round Down', () => {
  it('is correct rounding numbers down', () => {
    expect(roundDown({value: 3.2, decimals: 0})).toBe(3);
    expect(roundDown({value: 76.9, decimals: 0})).toBe(76);
    expect(roundDown({value: 3.14159, decimals: 3})).toBe(3.141);
    expect(roundDown({value: -3.14159, decimals: 1})).toBe(-3.1);
    expect(roundDown({value: 31415.92654, decimals: -2})).toBe(31400);
  });
});
