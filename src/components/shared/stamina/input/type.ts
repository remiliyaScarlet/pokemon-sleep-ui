import {StaminaCalcConfig, StaminaSkillTriggerData} from '@/types/game/producing/stamina';


export type StaminaConfigProps = {
  idPrefix: string,
  config: StaminaCalcConfig,
  setConfig: (updated: StaminaCalcConfig) => void,
  trigger: StaminaSkillTriggerData,
  setTrigger: (updated: StaminaSkillTriggerData) => void,
};
