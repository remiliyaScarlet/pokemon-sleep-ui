import {toSum} from '@/utils/array';


export type WeightedAverageDataPoint = {
  num: number,
  weight: number,
};

export const getWeightedAverage = (points: WeightedAverageDataPoint[]): number => {
  const sum = toSum(points.map(({num, weight}) => num * weight));
  const sumWeights = toSum(points.map(({weight}) => weight));

  return sum / sumWeights;
};
