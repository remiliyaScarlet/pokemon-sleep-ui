import React from 'react';

import {Flex} from '@/components/layout/flex';
import {classNames} from '@/utils/react';


type Props = {
  highlight?: boolean,
};

export const FilterInputRow = ({highlight, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex
      direction="col"
      className={classNames(
        'items-center gap-1 rounded-lg p-1 sm:flex-row',
        highlight ? 'bg-slate-50 dark:bg-slate-700/50' : 'bg-slate-50/40 dark:bg-slate-700/20',
      )}
    >
      {children}
    </Flex>
  );
};
