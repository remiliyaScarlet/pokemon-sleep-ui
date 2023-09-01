import React from 'react';

import clsx from 'clsx';

import {LayoutProps} from '@/components/layout/type';
import {getLayoutClassNames} from '@/components/layout/util';


type Props = LayoutProps;

export const Grid = React.forwardRef<HTMLDivElement, React.PropsWithChildren<Props>>(({
  children,
  ...props
}, ref) => {
  return (
    <div ref={ref} className={clsx('grid', getLayoutClassNames(props))}>
      {children}
    </div>
  );
});
Grid.displayName = 'Grid';
