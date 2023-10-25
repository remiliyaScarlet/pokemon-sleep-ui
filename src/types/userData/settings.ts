import {EffectiveBonus, UserBonus} from '@/types/game/bonus';
import {StaminaCalcConfig, StaminaSkillTriggerData} from '@/types/game/producing/stamina';
import {SleepMapId} from '@/types/game/sleepStyle';
import {Migratable} from '@/types/migrate';


export type UserSettings = Migratable & {
  bonus: UserBonus,
  stamina: StaminaCalcConfig,
  staminaSkillTrigger: StaminaSkillTriggerData,
  currentMap: SleepMapId,
};

export type CalculatedUserSettings = {
  bonus: EffectiveBonus,
  sleepDurations: number[],
};
