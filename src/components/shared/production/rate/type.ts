import React from 'react';

import {Dimension} from '@/types/style';


export type ProducingRateContentCommonProps = {
  getIcon?: (dimension: Dimension) => React.ReactNode,
  normalSize?: boolean,
};
