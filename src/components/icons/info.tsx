import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  className?: string,
  warn?: boolean,
};

export const InfoIcon = ({className, warn, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex center noFullWidth className={clsx(
      'h-5 w-5 text-xs',
      warn ? 'info-icon-warn' : 'info-icon-normal',
      className,
    )}>
      {children}
    </Flex>
  );
};
