import {StaminaEventLog} from '@/types/game/stamina/event';


export type StaminaEfficiency = {
  logs: StaminaEventLog[],
  average: number,
  awake: number,
  sleep: number,
};
