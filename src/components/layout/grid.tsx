import React from 'react';

import clsx from 'clsx';

import {LayoutProps} from '@/components/layout/type';
import {getLayoutClassNames} from '@/components/layout/util';


type Props = LayoutProps;

export const Grid = ({children, ...props}: React.PropsWithChildren<Props>) => {
  return (
    <div className={clsx(
      'grid',
      getLayoutClassNames(props),
    )}>
      {children}
    </div>
  );
};
