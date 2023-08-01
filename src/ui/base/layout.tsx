import React from 'react';

import {Announcements} from '@/components/announcement/main';
import {Flex} from '@/components/layout/flex';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {I18nProvider} from '@/contexts/i18n';
import {NavBar} from '@/ui/base/navbar/main';
import {classNames} from '@/utils/react';


type Props = {
  announcement?: boolean,
};

export const PageLayout = ({announcement = true, children}: React.PropsWithChildren<Props>) => {
  return (
    <main className={classNames(
      'transform-smooth flex min-h-full w-full flex-col',
      'bg-gradient-radial from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-950',
      'text-neutral-900 dark:text-neutral-100',
    )}>
      <I18nProvider namespaces={['UI.Metadata']}>
        <NavBar/>
      </I18nProvider>
      <Flex direction="col" className="gap-1.5 p-2">
        {announcement && (
          <>
            <Announcements/>
            <HorizontalSplitter/>
          </>
        )}
        {children}
      </Flex>
    </main>
  );
};
