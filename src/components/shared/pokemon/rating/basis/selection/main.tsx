import React from 'react';

import {RatingBasisSelectionBase} from '@/components/shared/pokemon/rating/basis/selection/base';
import {RatingBasisSelectionCommonProps} from '@/components/shared/pokemon/rating/basis/selection/type';
import {RatingBasisTitle} from '@/components/shared/pokemon/rating/basis/title';
import {RatingBasis, ratingBasis} from '@/types/game/pokemon/rating';


export const RatingBasisSelection = (props: RatingBasisSelectionCommonProps<RatingBasis>) => {
  return (
    <RatingBasisSelectionBase
      {...props}
      ids={[...ratingBasis]}
      idToButton={(basis, isActive) => (
        <RatingBasisTitle basis={basis} isActive={isActive}/>
      )}
    />
  );
};
