import React from 'react';

import {clsx} from 'clsx';

import {LoadingIcon} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex/common';


type Props = {
  loading: boolean,
  className?: string,
  loadingFullHeight?: boolean,
};

const LazyLoadInternal = ({
  loading,
  className,
  loadingFullHeight,
  children,
}: React.PropsWithChildren<Props>, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <Flex ref={ref} direction="col" className={clsx('relative', className, loading && 'min-h-[8rem]')}>
      {
        loading &&
        <Flex className={clsx(
          'absolute left-0 top-0 z-50 h-full rounded-lg bg-slate-100/80 dark:bg-slate-800/80',
        )}>
          <Flex className={clsx(loadingFullHeight ? 'h-full' : 'h-40')}>
            <LoadingIcon/>
          </Flex>
        </Flex>
      }
      {children}
    </Flex>
  );
};

export const LazyLoad = React.forwardRef(LazyLoadInternal);
