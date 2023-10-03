import React from 'react';

import {clsx} from 'clsx';

import {rowBackground} from '@/components/input/filter/const';
import {InputRowProps} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex/common';


type Props = InputRowProps & {
  className?: string,
};

export const InputRow = ({style = 'normal', noRowPadding, className, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex noFullWidth={style === 'none'} className={clsx(
      'items-center gap-1 rounded-lg sm:flex-row',
      !noRowPadding && 'p-1',
      rowBackground[style],
      className,
    )}>
      {children}
    </Flex>
  );
};
