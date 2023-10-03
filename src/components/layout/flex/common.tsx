import React from 'react';

import clsx from 'clsx';

import {LayoutProps} from '@/components/layout/type';
import {getLayoutClassNames} from '@/components/layout/util';


type Props = LayoutProps & {
  direction: 'row' | 'col',
  wrap?: boolean,
};

export const Flex = React.forwardRef<HTMLDivElement, React.PropsWithChildren<Props>>(({
  direction,
  wrap,
  children,
  ...props
}, ref) => {
  return (
    <div ref={ref} className={clsx(
      'flex',
      direction === 'row' ? 'flex-row' : 'flex-col',
      wrap && 'flex-wrap',
      getLayoutClassNames(props),
    )}>
      {children}
    </div>
  );
});
Flex.displayName = 'Flex';
