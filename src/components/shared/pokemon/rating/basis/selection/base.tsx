import React from 'react';

import MagnifyingGlassCircleIcon from '@heroicons/react/24/outline/MagnifyingGlassCircleIcon';

import {FilterTextInput} from '@/components/input/filter/text';
import {FilterCategoryInputProps} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex/common';
import {RatingBasisSelectionCommonProps} from '@/components/shared/pokemon/rating/basis/selection/type';
import {RatingBasis} from '@/types/game/pokemon/rating';


type Props<TRatingBasis extends RatingBasis | null> =
  Pick<FilterCategoryInputProps<TRatingBasis>, 'ids' | 'idToButton'> &
  RatingBasisSelectionCommonProps<TRatingBasis>;

export const RatingBasisSelectionBase = <TRatingBasis extends RatingBasis | null>({
  current,
  onSelect,
  ...props
}: Props<TRatingBasis>) => {
  return (
    <FilterTextInput
      onClick={onSelect}
      isActive={(basis) => basis === current}
      title={
        <Flex center>
          <MagnifyingGlassCircleIcon className="h-6 w-6"/>
        </Flex>
      }
      {...props}
    />
  );
};
