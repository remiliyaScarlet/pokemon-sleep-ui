import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {RatingResultProps} from '@/components/shared/pokemon/rating/type';
import {RatingResultTitle} from '@/components/shared/pokemon/rating/units/title';
import {
  RatingWeightedStatsUI,
  RatingWeightedStatsUiProps,
} from '@/components/shared/pokemon/rating/units/weightedStats';


type Props = RatingResultProps & RatingWeightedStatsUiProps;

export const RatingResultSummary = (props: Props) => {
  return (
    <Flex className="items-center gap-1.5 md:flex-row">
      <Flex>
        <RatingResultTitle {...props}/>
      </Flex>
      <Flex>
        <RatingWeightedStatsUI {...props}/>
      </Flex>
    </Flex>
  );
};
