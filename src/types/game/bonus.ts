import {SleepMapId} from '@/types/game/sleepStyle';
import {StaminaEfficiency} from '@/types/game/stamina/efficiency';


export type UserBonus = {
  map: {[id in SleepMapId]?: number},
  overall: number,
};

export type EffectiveBonus = {
  map: number,
  stamina: StaminaEfficiency,
  overall: number,
};
