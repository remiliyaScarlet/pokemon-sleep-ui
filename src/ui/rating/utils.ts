import {RatingRequest} from '@/types/game/pokemon/rating';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {RatingSetupInputs} from '@/ui/rating/type';


export type ToRatingSetupDataOpts = {
  setup: RatingSetupInputs,
  calculatedSettings: CalculatedUserSettings,
  timestamp?: number,
};

export const toRatingRequest = ({setup, calculatedSettings, timestamp}: ToRatingSetupDataOpts): RatingRequest => {
  return {
    setup: {
      ...setup,
      ...calculatedSettings,
    },
    timestamp: timestamp ?? Date.now(),
  };
};
