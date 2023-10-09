import {staminaDepleteInterval} from '@/const/game/stamina';


type GetStaminaAfterDurationOpts = {
  start: number,
  duration: number,
};

type StaminaAfterDurationReturn = {
  inGame: number,
  actual: number,
};

export const getStaminaAfterDuration = ({
  start,
  duration,
}: GetStaminaAfterDurationOpts): StaminaAfterDurationReturn => {
  const actual = start - (duration / staminaDepleteInterval);

  return {
    inGame: Math.max(0, actual),
    actual,
  };
};
