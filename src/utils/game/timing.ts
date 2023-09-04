import {durationOfDay} from '@/const/game/common';


export const rotateTiming = (timing: number): number => {
  return (timing + durationOfDay) % durationOfDay;
};
