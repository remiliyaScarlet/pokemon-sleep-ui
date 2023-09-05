import {StaminaCalcConfig} from '@/types/game/producing/stamina';


export type UserSettingsEnergyProps = {
  config: StaminaCalcConfig,
  setConfig: (updated: StaminaCalcConfig) => void,
};
