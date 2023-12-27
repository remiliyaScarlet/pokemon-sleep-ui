import React from 'react';

import {LabelProps} from 'recharts';

import {ratingResultChartLabelFormatter} from '@/components/shared/pokemon/rating/section/chart/const';
import {RatingWeightedStatsBasis} from '@/types/game/pokemon/rating/config';


type Props = LabelProps & {
  basis: RatingWeightedStatsBasis,
};

export const RatingResultLabel = ({x, y, value, basis}: Props) => {
  return (
    <text x={x} y={y} dy={-7} textAnchor="middle" className="fill-neutral-900 text-xs dark:fill-neutral-100">
      {typeof value === 'number' ? ratingResultChartLabelFormatter[basis](value) : value}
    </text>
  );
};
