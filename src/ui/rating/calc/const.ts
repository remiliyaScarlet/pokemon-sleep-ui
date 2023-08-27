import {RatingResultOfLevel} from '@/ui/rating/result/type';


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
