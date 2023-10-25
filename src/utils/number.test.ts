import {describe, expect, it} from '@jest/globals';

import {generateDecimalsAndOnes} from '@/utils/number';


describe('Number / Generate Decimals and Ones', () => {
  it('is correct if num is 0', () => {
    const results = [...generateDecimalsAndOnes(0)];

    expect(results).toHaveLength(0);
  });

  it('is correct if num < 1', () => {
    const results = [...generateDecimalsAndOnes(0.5)];

    expect(results[0]).toBe(0.5);
    expect(results).toHaveLength(1);
  });

  it('is correct if num is 1', () => {
    const results = [...generateDecimalsAndOnes(1)];

    expect(results[0]).toBe(1);
    expect(results).toHaveLength(1);
  });

  it('is correct if num is 1~2', () => {
    const results = [...generateDecimalsAndOnes(1.5)];

    expect(results[0]).toBe(1.5);
    expect(results).toHaveLength(1);
  });

  it('is correct if num is 2', () => {
    const results = [...generateDecimalsAndOnes(2)];

    expect(results[0]).toBe(1);
    expect(results[1]).toBe(1);
    expect(results).toHaveLength(2);
  });

  it('is correct if num > 2', () => {
    const results = [...generateDecimalsAndOnes(2.5)];

    expect(results[0]).toBe(1.5);
    expect(results[1]).toBe(1);
    expect(results).toHaveLength(2);
  });
});
