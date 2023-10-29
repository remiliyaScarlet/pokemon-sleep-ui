import React from 'react';

import ArrowUpRightIcon from '@heroicons/react/24/outline/ArrowUpRightIcon';

import {FlexLink} from '@/components/layout/flex/link';


type Props = {
  mealId: number,
};

export const CookingExternalLink = ({mealId}: Props) => {
  return (
    <FlexLink href={`/meal/${mealId}`} className="button-clickable-bg h-5 w-5 p-1" target="_blank">
      <ArrowUpRightIcon/>
    </FlexLink>
  );
};
