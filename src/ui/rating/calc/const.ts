import {RatingResult} from '@/ui/rating/result/type';


export const initialResult: RatingResult = {
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
