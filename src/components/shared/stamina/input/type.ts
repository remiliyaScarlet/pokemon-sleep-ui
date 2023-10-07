import {StaminaCalcConfig} from '@/types/game/producing/stamina';


export type StaminaConfigProps = {
  config: StaminaCalcConfig,
  setConfig: (updated: StaminaCalcConfig) => void,
  idPrefix: string,
};
