import {StaminaCalcConfig} from '@/types/game/producing/stamina';
import {StaminaEventLogFlattened} from '@/ui/stamina/type';


export type StaminaChartCommonProps = {
  config: StaminaCalcConfig,
  logs: StaminaEventLogFlattened[],
};
