import React from 'react';

import {clsx} from 'clsx';

import {rowBackground} from '@/components/input/filter/const';
import {InputRowProps} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex';


type Props = InputRowProps & {
  className?: string,
};

export const InputRow = ({style = 'normal', className, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex direction="col" noFullWidth={style === 'none'} className={clsx(
      'items-center gap-1 rounded-lg p-1 sm:flex-row', rowBackground[style], className,
    )}>
      {children}
    </Flex>
  );
};
