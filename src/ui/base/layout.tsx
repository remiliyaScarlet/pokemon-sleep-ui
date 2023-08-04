import React from 'react';

import {Announcements} from '@/components/announcement/main';
import {Flex} from '@/components/layout/flex';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {I18nProvider} from '@/contexts/i18n';
import {NavBar} from '@/ui/base/navbar/main';


type Props = {
  announcement?: boolean,
};

export const PageLayout = ({announcement = true, children}: React.PropsWithChildren<Props>) => {
  return (
    <main className="min-h-full w-full">
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
