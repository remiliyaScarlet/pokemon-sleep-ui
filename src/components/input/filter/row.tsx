import React from 'react';

import {clsx} from 'clsx';

import {rowBackground} from '@/components/input/filter/const';
import {InputRowProps} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex';


export const InputRow = ({style = 'normal', children}: React.PropsWithChildren<InputRowProps>) => {
  return (
    <Flex
      direction="col"
      className={clsx('items-center gap-1 rounded-lg p-1 sm:flex-row', rowBackground[style])}
      noFullWidth={style === 'none'}
    >
      {children}
    </Flex>
  );
};
