import {describe, expect, it} from '@jest/globals';

import {StaminaCalcConfig} from '@/types/game/producing/stamina';
import {getStaminaEfficiency} from '@/utils/game/stamina/main';


describe('Stamina Efficiency', () => {
  it('has correct stamina efficiency', () => {
    const config: StaminaCalcConfig = {
      sleepSession: {
        primary: {
          start: 84600, // 23:30
          end: 21600, // 06:00
        },
        secondary: {
          start: 46800, // 13:00
          end: 52200, // 14:30
        },
      },
      skillRecovery: {
        strategy: 'conservative',
        dailyCount: 3,
        amount: 9,
      },
    };

    expect(getStaminaEfficiency({config})).toBeCloseTo(2.189815);
  });
});
