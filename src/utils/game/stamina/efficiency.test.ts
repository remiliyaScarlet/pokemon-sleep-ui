import {describe, expect, it} from '@jest/globals';

import {getEfficiency} from '@/utils/game/stamina/efficiency';


describe('Efficiency at certain stamina', () => {
  it('has correct efficiency', () => {
    expect(getEfficiency(100)).toBe(2.2);
    expect(getEfficiency(90)).toBe(2.2);
    expect(getEfficiency(80)).toBe(1.9);
    expect(getEfficiency(70)).toBe(1.9);
    expect(getEfficiency(60)).toBeCloseTo(1.6);
    expect(getEfficiency(50)).toBeCloseTo(1.6);
    expect(getEfficiency(40)).toBeCloseTo(1.3);
    expect(getEfficiency(30)).toBeCloseTo(1.3);
    expect(getEfficiency(20)).toBe(1);
    expect(getEfficiency(10)).toBe(1);
  });
});
