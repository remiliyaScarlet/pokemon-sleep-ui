import {EffectiveBonus, UserBonus} from '@/types/game/bonus';
import {SleepMapId} from '@/types/game/sleepStyle';
import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {Migratable} from '@/types/migrate';


export type UserCalculationBehavior = {
  berryPokemonAlwaysFullPack: boolean,
  goodCampTicket: boolean,
};

export type UserSettings = Migratable & {
  bonus: UserBonus,
  stamina: StaminaCalcConfig,
  staminaSkillTrigger: StaminaSkillTriggerData,
  currentMap: SleepMapId,
  behavior: UserCalculationBehavior,
};

export type CalculatedUserSettings = Pick<UserSettings, 'behavior'> & {
  bonus: EffectiveBonus,
  sleepDurations: number[],
};
