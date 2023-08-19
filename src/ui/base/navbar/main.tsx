import React from 'react';

import {Flex} from '@/components/layout/flex';
import {I18nProvider} from '@/contexts/i18n';
import {NavBarClient} from '@/ui/base/navbar/client';
import {NavBarCommonProps} from '@/ui/base/navbar/type';
import {UserControl} from '@/ui/base/navbar/user/main';


export const NavBar = ({noUserControl}: NavBarCommonProps) => {
  return (
    <Flex
      direction="row" center
      className="sticky top-0 z-30 gap-1.5 border-b border-b-gray-700 bg-slate-300/90 p-2 dark:bg-slate-900/90"
    >
      <I18nProvider namespaces={['UI.Metadata']}>
        <NavBarClient/>
      </I18nProvider>
      {noUserControl || <UserControl/>}
    </Flex>
  );
};
