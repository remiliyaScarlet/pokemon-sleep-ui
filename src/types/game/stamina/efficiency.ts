import {ProducingState} from '@/types/game/producing/state';
import {StaminaEventLog} from '@/types/game/stamina/event';


export type StaminaEfficiency = {[state in ProducingState]: number} & {
  logs: StaminaEventLog[],
  average: number,
};
