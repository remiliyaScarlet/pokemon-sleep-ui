import React from 'react';

import {clsx} from 'clsx';


type Props = {
  visible: boolean,
  isAlert?: boolean,
};

export const Toast = ({visible, isAlert, children}: React.PropsWithChildren<Props>) => {
  return (
    <div className={clsx(
      'rounded-full px-6 py-4',
      'bg-slate-700/90 dark:bg-slate-100/90',
      isAlert ? 'text-red-300 dark:text-red-700' : 'text-slate-300 dark:text-slate-800',
      visible ? 'animate-enter' : 'animate-leave',
    )}>
      {children}
    </div>
  );
};
