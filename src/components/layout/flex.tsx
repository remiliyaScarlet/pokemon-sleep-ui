import React from 'react';

import {classNames} from '@/utils/react';


type Props = {
  direction: 'row' | 'col',
  center?: boolean,
  wrap?: boolean,
  noFullWidth?: boolean,
  className?: string,
};

export const Flex = ({direction, center, wrap, noFullWidth, className, children}: React.PropsWithChildren<Props>) => {
  return (
    <div className={classNames(
      'flex',
      direction === 'row' ? 'flex-row' : 'flex-col',
      center ? 'items-center justify-center text-center' : undefined,
      wrap ? 'flex-wrap' : undefined,
      noFullWidth ? undefined : 'w-full',
      className,
    )}>
      {children}
    </div>
  );
};
