import {TooltipProps} from 'recharts/types/component/Tooltip';

import {StaminaEventLogFlattened} from '@/types/game/stamina/event';


export type StaminaChartTooltipCommonProps = TooltipProps<number, number> & {
  logs: StaminaEventLogFlattened[],
  start: number,
};
