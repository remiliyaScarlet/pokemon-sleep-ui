import React from 'react';

import {Announcements} from '@/components/announcement/main';
import {Flex} from '@/components/layout/flex';
import {NavBar} from '@/ui/base/navbar/main';
import {classNames} from '@/utils/react';


export const PageLayout = ({children}: React.PropsWithChildren) => {
  return (
    <main className={classNames(
      'transform-smooth',
      'flex min-h-full w-full flex-col',
      'bg-gradient-radial from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-950',
      'text-neutral-900 dark:text-neutral-100',
    )}>
      <NavBar/>
      <Flex direction="col" className="gap-1.5 p-2">
        <Announcements/>
        {children}
      </Flex>
    </main>
  );
};
