import {staminaDepleteInterval} from '@/const/game/stamina';


type GetStaminaAfterDuration = {
  start: number,
  duration: number,
};

export const getStaminaAfterDuration = ({start, duration}: GetStaminaAfterDuration): number => {
  return Math.max(0, start - (duration / staminaDepleteInterval));
};
