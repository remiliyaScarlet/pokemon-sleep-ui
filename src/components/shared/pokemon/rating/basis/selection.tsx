import React from 'react';

import MagnifyingGlassCircleIcon from '@heroicons/react/24/outline/MagnifyingGlassCircleIcon';

import {FilterTextInput} from '@/components/input/filter/text';
import {Flex} from '@/components/layout/flex/common';
import {RatingBasisTitle} from '@/components/shared/pokemon/rating/basis/title';
import {RatingBasis, ratingBasis} from '@/types/game/pokemon/rating';


type Props = {
  current: RatingBasis,
  onSelect: (selected: RatingBasis) => void,
};

export const RatingBasisSelection = ({current, onSelect}: Props) => {
  return (
    <FilterTextInput
      onClick={onSelect}
      isActive={(basis) => basis === current}
      title={
        <Flex center>
          <MagnifyingGlassCircleIcon className="h-6 w-6"/>
        </Flex>
      }
      ids={[...ratingBasis]}
      idToButton={(basis, isActive) => (
        <RatingBasisTitle basis={basis} isActive={isActive}/>
      )}
      idToItemId={(basis) => basis}
    />
  );
};
