import React from 'react';

import {clsx} from 'clsx';


type Props = {
  visible: boolean,
};

export const Toast = ({visible, children}: React.PropsWithChildren<Props>) => {
  return (
    <div className={clsx(
      'rounded-full px-6 py-4',
      'bg-slate-700/90 text-slate-300 dark:bg-slate-400/90 dark:text-slate-800',
      visible ? 'animate-enter' : 'animate-leave',
    )}>
      {children}
    </div>
  );
};
