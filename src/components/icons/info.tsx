import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex';


type Props = {
  className?: string,
};

export const InfoIcon = ({children, className}: React.PropsWithChildren<Props>) => {
  return (
    <Flex direction="col" center noFullWidth className={clsx('info-in-image h-5 w-5 text-xs', className)}>
      {children}
    </Flex>
  );
};
