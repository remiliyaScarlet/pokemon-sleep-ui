import React from 'react';

import {clsx} from 'clsx';

import {rowBackground} from '@/components/input/filter/const';
import {InputRowProps} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex/common';


type Props = InputRowProps & {
  wrap?: boolean,
  defaultAsCol?: boolean,
};

export const InputRow = ({
  style = 'normal',
  noRowPadding,
  className,
  wrap = true,
  defaultAsCol = false,
  children,
}: React.PropsWithChildren<Props>) => {
  return (
    <Flex direction={defaultAsCol ? 'col' : 'row'} noFullWidth={style === 'none'} wrap={wrap} className={clsx(
      'items-center gap-1 rounded-lg',
      !noRowPadding && 'p-1',
      rowBackground[style],
      className,
    )}>
      {children}
    </Flex>
  );
};
