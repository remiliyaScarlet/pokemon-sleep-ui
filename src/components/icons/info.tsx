import React from 'react';

import {clsx} from 'clsx';

import {infoIconStyleClass} from '@/components/icons/const';
import {InfoIconStyle} from '@/components/icons/type';
import {Flex} from '@/components/layout/flex/common';


type Props = {
  className?: string,
  style?: InfoIconStyle,
};

export const InfoIcon = ({className, style, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex center noFullWidth className={clsx(
      'h-5 w-5 text-xs',
      style ? infoIconStyleClass[style] : infoIconStyleClass.normal,
      className,
    )}>
      {children}
    </Flex>
  );
};
