import React from 'react';

import {clsx} from 'clsx';

import {infoIconStyleClass} from '@/components/icons/const';
import {InfoIconStyle} from '@/components/icons/type';
import {Flex} from '@/components/layout/flex/common';
import {Dimension} from '@/types/style';


type Props = {
  className?: string,
  dimension?: Dimension,
  style?: InfoIconStyle,
};

export const InfoIcon = ({className, dimension, style, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex center noFullWidth className={clsx(
      'text-xs',
      dimension ?? 'h-5 w-5',
      style ? infoIconStyleClass[style] : infoIconStyleClass.normal,
      className,
    )}>
      {children}
    </Flex>
  );
};
