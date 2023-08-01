import React from 'react';

import {rowBackground} from '@/components/input/filter/const';
import {InputRowProps} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex';
import {classNames} from '@/utils/react';


export const InputRow = ({style = 'normal', children}: React.PropsWithChildren<InputRowProps>) => {
  return (
    <Flex
      direction="col"
      className={classNames('items-center gap-1 rounded-lg p-1 sm:flex-row', rowBackground[style])}
      noFullWidth={style === 'none'}
    >
      {children}
    </Flex>
  );
};
