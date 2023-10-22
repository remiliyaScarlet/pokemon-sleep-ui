import React from 'react';

import {RatingBasisSelection} from '@/components/shared/pokemon/rating/basis/selection/main';
import {RatingBasisTitle} from '@/components/shared/pokemon/rating/basis/title';
import {RatingResultProps} from '@/components/shared/pokemon/rating/type';


export const RatingResultTitle = ({request, setRequest}: Pick<RatingResultProps, 'request' | 'setRequest'>) => {
  if (!setRequest) {
    return <RatingBasisTitle basis={request?.setup.basis} larger/>;
  }

  if (!request) {
    return null;
  }

  return (
    <RatingBasisSelection
      current={request.setup.basis}
      onSelect={(basis) => setRequest({
        ...request,
        setup: {
          ...request.setup,
          basis,
        },
        timestamp: Date.now(),
      })}
    />
  );
};
