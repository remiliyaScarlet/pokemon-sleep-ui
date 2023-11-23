import React from 'react';

import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import {clsx} from 'clsx';

import {Dimension} from '@/types/style';


type Props = {
  onClick: () => void,
  className?: string,
} & ({
  dimension: Dimension,
  iconDimension?: never,
} | {
  dimension?: never,
  iconDimension: Dimension,
});

export const DeleteButton = ({dimension, iconDimension, onClick, className}: Props) => {
  return (
    <button onClick={onClick} className={clsx(
      'transform-smooth button-alert-bg shrink-0 rounded-lg p-1',
      dimension,
      className,
    )}>
      <TrashIcon className={iconDimension}/>
    </button>
  );
};
