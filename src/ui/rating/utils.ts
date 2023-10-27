import {RatingRequest, RatingSetupData} from '@/types/game/pokemon/rating';


export type ToRatingSetupDataOpts = {
  setup: RatingSetupData,
  timestamp?: number,
};

export const toRatingRequest = ({
  setup,
  timestamp,
}: ToRatingSetupDataOpts): RatingRequest => {
  return {
    setup,
    timestamp: timestamp ?? Date.now(),
  };
};
