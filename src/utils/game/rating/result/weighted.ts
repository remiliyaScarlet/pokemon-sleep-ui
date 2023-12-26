import {RatingResultMap} from '@/components/shared/pokemon/rating/type';
import {PokemonKeyLevel} from '@/types/game/pokemon/level';
import {
  RatingResultOfLevel,
  RatingWeight,
  RatingWeightedStats,
  ratingWeightedStatsBasis,
  RatingWeightedStatsBasis,
} from '@/types/game/pokemon/rating';
import {getWeightedAverage, WeightedAverageDataPoint} from '@/utils/number/average';
import {isNotNullish} from '@/utils/type';


type GetRatingWeightedStatsDataPointOpts = {
  resultOfLevel: RatingResultOfLevel,
  basis: RatingWeightedStatsBasis,
};

const getRatingWeightedStatsFromResult = ({
  resultOfLevel,
  basis,
}: GetRatingWeightedStatsDataPointOpts): number => {
  const {percentage, percentile, baseDiffPercent} = resultOfLevel;

  if (basis === 'percentage') {
    return percentage;
  }

  if (basis === 'percentile') {
    return percentile;
  }

  if (basis === 'relativeStrength') {
    return baseDiffPercent;
  }

  throw new Error(`Unhandled weighted rating stats basis: [${basis satisfies never}`);
};

export type GetRatingWeightedStatsOpts = {
  activeKeyLevels: PokemonKeyLevel[],
  result: RatingResultMap,
  weight: RatingWeight,
};

export const getRatingWeightedStats = ({
  activeKeyLevels,
  result,
  weight,
}: GetRatingWeightedStatsOpts): RatingWeightedStats => {
  return Object.fromEntries(ratingWeightedStatsBasis.map((basis) => [
    basis,
    getWeightedAverage(
      activeKeyLevels
        .map((level): WeightedAverageDataPoint | null => {
          const resultOfLevel = result[level];
          const weightOfLevel = weight[level];

          if (!resultOfLevel || !weightOfLevel) {
            return null;
          }

          return {
            num: getRatingWeightedStatsFromResult({resultOfLevel, basis}),
            weight: weightOfLevel,
          };
        })
        .filter(isNotNullish),
    ),
  ])) as RatingWeightedStats;
};
