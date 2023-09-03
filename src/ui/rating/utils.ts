import {EffectiveBonus} from '@/types/game/bonus';
import {RatingRequest} from '@/types/game/pokemon/rating';
import {RatingSetupInputs} from '@/ui/rating/type';


export type ToRatingSetupDataOpts = {
  setup: RatingSetupInputs,
  bonus: EffectiveBonus,
  timestamp?: number,
};

export const toRatingRequest = ({setup, bonus, timestamp}: ToRatingSetupDataOpts): RatingRequest => {
  return {
    setup: {
      ...setup,
      bonus,
    },
    timestamp: timestamp ?? Date.now(),
  };
};
