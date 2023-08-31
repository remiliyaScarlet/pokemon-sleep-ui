import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex';


export const AbsoluteInfoIcon = ({children}: React.PropsWithChildren) => {
  return (
    <Flex direction="col" center noFullWidth className={clsx(
      'info-in-image absolute bottom-0 right-0 z-10 h-5 w-5 text-xs',
    )}>
      {children}
    </Flex>
  );
};
