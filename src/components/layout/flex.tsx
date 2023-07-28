import React from 'react';

import {classNames} from '@/utils/react';


type Props = {
  direction: 'row' | 'col',
  center?: boolean,
  wrap?: boolean,
  stretch?: boolean,
  noFullWidth?: boolean,
  className?: string,
};

export const Flex = ({
  direction,
  center,
  wrap,
  stretch,
  noFullWidth,
  className,
  children,
}: React.PropsWithChildren<Props>) => {
  return (
    <div className={classNames(
      'flex',
      direction === 'row' ? 'flex-row' : 'flex-col',
      center ? 'items-center justify-center text-center content-center' : undefined,
      wrap ? 'flex-wrap' : undefined,
      stretch ? 'self-stretch' : undefined,
      noFullWidth ? undefined : 'w-full',
      className,
    )}>
      {children}
    </div>
  );
};
