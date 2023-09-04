import {describe, expect, it} from '@jest/globals';

import {getStaminaAfterDuration} from '@/utils/game/stamina/depletion';


describe('Stamina Depletion', () => {
  it('depletes', () => {
    expect(getStaminaAfterDuration({start: 100, duration: 600})).toBe(99);
    expect(getStaminaAfterDuration({start: 100, duration: 4200})).toBe(93);
    expect(getStaminaAfterDuration({start: 100, duration: 30000})).toBe(50);
    expect(getStaminaAfterDuration({start: 0, duration: 600})).toBe(0);
  });
});
