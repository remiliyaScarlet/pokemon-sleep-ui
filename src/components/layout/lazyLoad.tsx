import React from 'react';

import {clsx} from 'clsx';

import {LoadingIcon} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex';


type Props = {
  loading: boolean,
  className?: string,
};

export const LazyLoad = ({loading, className, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex direction="row" wrap className={clsx('relative', className, loading && 'min-h-[8rem]')}>
      {
        loading &&
        <Flex direction="col" className={clsx(
          'absolute left-0 top-0 z-20 h-full rounded-lg bg-slate-100/80 dark:bg-slate-800/80',
        )}>
          <Flex direction="col" className="h-40">
            <LoadingIcon/>
          </Flex>
        </Flex>
      }
      {children}
    </Flex>
  );
};
