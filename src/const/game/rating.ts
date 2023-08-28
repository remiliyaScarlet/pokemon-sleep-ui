import {RatingResultOfLevel} from '@/types/game/pokemon/rating';


export const initialResult: Omit<RatingResultOfLevel, 'level'> = {
  samples: NaN,
  rank: NaN,
  percentage: NaN,
  percentile: NaN,
  points: {
    min: null,
    current: null,
    max: null,
  },
};

export const isInitialResult = (result: RatingResultOfLevel): boolean => {
  return isNaN(result.rank);
};
