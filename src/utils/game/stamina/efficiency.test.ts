import {describe, expect, it} from '@jest/globals';

import {getEfficiency} from '@/utils/game/stamina/efficiency';


describe('Efficiency at certain stamina', () => {
  it('has correct efficiency', () => {
    expect(getEfficiency({type: null, stamina: 100})).toBe(2.2);
    expect(getEfficiency({type: null, stamina: 90})).toBe(2.2);
    expect(getEfficiency({type: null, stamina: 80})).toBe(1.9);
    expect(getEfficiency({type: null, stamina: 70})).toBe(1.9);
    expect(getEfficiency({type: null, stamina: 60})).toBeCloseTo(1.6);
    expect(getEfficiency({type: null, stamina: 50})).toBeCloseTo(1.6);
    expect(getEfficiency({type: null, stamina: 40})).toBeCloseTo(1.3);
    expect(getEfficiency({type: null, stamina: 30})).toBeCloseTo(1.3);
    expect(getEfficiency({type: null, stamina: 20})).toBe(1);
    expect(getEfficiency({type: null, stamina: 10})).toBe(1);
  });
});
