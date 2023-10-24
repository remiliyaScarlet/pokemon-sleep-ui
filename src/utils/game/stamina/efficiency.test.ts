import {describe, expect, it} from '@jest/globals';

import {getEfficiency} from '@/utils/game/stamina/efficiency';


describe('Efficiency at certain stamina', () => {
  it('has correct efficiency', () => {
    expect(getEfficiency({stamina: 100})).toBe(2.2);
    expect(getEfficiency({stamina: 90})).toBe(2.2);
    expect(getEfficiency({stamina: 80})).toBe(1.9);
    expect(getEfficiency({stamina: 70})).toBe(1.9);
    expect(getEfficiency({stamina: 60})).toBeCloseTo(1.6);
    expect(getEfficiency({stamina: 50})).toBeCloseTo(1.6);
    expect(getEfficiency({stamina: 40})).toBeCloseTo(1.4);
    expect(getEfficiency({stamina: 30})).toBeCloseTo(1.4);
    expect(getEfficiency({stamina: 20})).toBe(1);
    expect(getEfficiency({stamina: 10})).toBe(1);
  });
});
