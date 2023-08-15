import React from 'react';

import {clsx} from 'clsx';


type Props = {
  visible: boolean,
};

export const Toast = ({visible, children}: React.PropsWithChildren<Props>) => {
  return (
    <div className={clsx(
      'rounded-full border border-slate-400 px-6 py-4 shadow-lg dark:border-slate-500',
      'bg-gradient-to-br from-slate-400 to-slate-100 dark:from-slate-500 dark:to-slate-800',
      visible ? 'animate-enter' : 'animate-leave',
    )}>
      {children}
    </div>
  );
};
