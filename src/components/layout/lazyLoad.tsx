import React from 'react';

import {clsx} from 'clsx';

import {LoadingIcon} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex';


type Props = {
  loading: boolean,
  className?: string,
  loadingFullHeight?: boolean,
};

export const LazyLoad = React.forwardRef<HTMLDivElement, React.PropsWithChildren<Props>>(({
  loading,
  className,
  loadingFullHeight,
  children,
}, ref) => {
  return (
    <Flex ref={ref} direction="col" className={clsx('relative', className, loading && 'min-h-[8rem]')}>
      {
        loading &&
        <Flex direction="col" className={clsx(
          'absolute left-0 top-0 z-50 h-full rounded-lg bg-slate-100/80 dark:bg-slate-800/80',
        )}>
          <Flex direction="col" className={clsx(loadingFullHeight ? 'h-full' : 'h-40')}>
            <LoadingIcon/>
          </Flex>
        </Flex>
      }
      {children}
    </Flex>
  );
});
LazyLoad.displayName = 'LazyLoad';
