import {UserBonus} from '@/types/game/bonus';
import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {UserSettings} from '@/types/userData/settings';


export const defaultMapBonus = 0;

export const defaultUserBonus: UserBonus = {
  overall: 0,
  map: {},
  ingredient: 20,
};

export const defaultStaminaCalcConfig: StaminaCalcConfig = {
  sleepSession: {
    primary: {
      start: 82800, // 23:00
      end: 21600, // 06:00 (7 hrs)
    },
    secondary: {
      start: 46800, // 13:00
      end: 52200, // 14:30 (1.5 hrs)
    },
  },
  skillRecovery: {
    strategy: 'optimistic',
  },
  recoveryRate: {
    general: 1,
    sleep: 1,
  },
};

export const defaultStaminaSkillTrigger: StaminaSkillTriggerData = {
  dailyCount: 3,
  amount: 18,
};

export const defaultUserSettings: UserSettings = {
  bonus: defaultUserBonus,
  stamina: defaultStaminaCalcConfig,
  staminaSkillTrigger: defaultStaminaSkillTrigger,
  currentMap: 1,
  version: 3,
};
