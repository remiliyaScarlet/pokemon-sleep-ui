import React from 'react';

import {rowBackground} from '@/components/input/filter/const';
import {FilterRowBackgroundStyle} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex';
import {classNames} from '@/utils/react';


type Props = {
  style?: FilterRowBackgroundStyle,
};

export const FilterInputRow = ({style = 'normal', children}: React.PropsWithChildren<Props>) => {
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
