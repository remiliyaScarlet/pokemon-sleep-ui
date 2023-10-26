import {SleepMapId} from '@/types/game/sleepStyle';
import {StaminaEfficiency} from '@/types/game/stamina/efficiency';


export type UserBonus = {
  ingredient: number,
  map: {[id in SleepMapId]?: number},
  overall: number,
};

export type EffectiveBonus = {
  ingredient: number,
  map: number,
  stamina: StaminaEfficiency,
  overall: number,
};
