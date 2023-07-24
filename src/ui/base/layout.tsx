import React from 'react';

import {NavBar} from '@/ui/base/navbar/main';
import {classNames} from '@/utils/react';


export const PageLayout = ({children}: React.PropsWithChildren) => {
  return (
    <main className={classNames(
      'flex min-h-full w-full flex-col gap-1.5 bg-gradient-radial p-2 transform-gpu transition-colors',
      'from-slate-200 to-slate-300 text-neutral-900 dark:from-slate-800 dark:to-slate-950 dark:text-neutral-100',
    )}>
      <NavBar/>
      <hr className="border-t-gray-700"/>
      {children}
    </main>
  );
};
