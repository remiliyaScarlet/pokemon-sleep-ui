import React from 'react';

import {classNames} from '@/utils/react';


type Props = {
  className?: string,
};

export const Row = ({className, children}: React.PropsWithChildren<Props>) => {
  return (
    <div className={classNames('flex w-full flex-row gap-2', className)}>
      {children}
    </div>
  );
};
