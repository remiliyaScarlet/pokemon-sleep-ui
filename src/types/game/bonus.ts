import {SleepMapId} from '@/types/game/sleepStyle';


export type UserBonus = {
  ingredient: number,
  map: {[id in SleepMapId]?: number},
  overall: number,
};
