import {TooltipProps} from 'recharts/types/component/Tooltip';

import {StaminaEventLogFlattened} from '@/ui/stamina/type';


export type StaminaChartTooltipCommonProps = TooltipProps<number, number> & {
  logs: StaminaEventLogFlattened[],
  start: number,
};
