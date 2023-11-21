import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';


export type StaminaConfigProps = {
  config: StaminaCalcConfig,
  setConfig: (updated: StaminaCalcConfig) => void,
  trigger: StaminaSkillTriggerData,
  setTrigger: (updated: StaminaSkillTriggerData) => void,
};
