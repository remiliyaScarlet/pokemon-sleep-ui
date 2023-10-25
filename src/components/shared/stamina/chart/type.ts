import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {StaminaEventLogFlattened} from '@/types/game/stamina/event';


export type StaminaChartCommonProps = {
  config: StaminaCalcConfig,
  logs: StaminaEventLogFlattened[],
};
