import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {StaminaEventLogFlattened} from '@/ui/stamina/type';


export type StaminaChartCommonProps = {
  config: StaminaCalcConfig,
  logs: StaminaEventLogFlattened[],
};
