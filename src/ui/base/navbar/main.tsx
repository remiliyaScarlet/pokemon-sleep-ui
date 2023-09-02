import React from 'react';

import {getServerSession} from 'next-auth';

import {Flex} from '@/components/layout/flex';
import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getMapIds} from '@/controller/mapMeta';
import {NavBarClient} from '@/ui/base/navbar/client';
import {NavBarCommonProps} from '@/ui/base/navbar/type';
import {UserAuthControl} from '@/ui/base/navbar/userAuth/main';


export const NavBar = ({noUserControl, locale}: NavBarCommonProps) => {
  const [
    session,
    mapIds,
  ] = React.use(Promise.all([
    getServerSession(authOptions),
    getMapIds(),
  ]));

  return (
    <Flex
      direction="row" center
      className="sticky top-0 z-30 gap-1.5 border-b border-b-gray-700 bg-slate-300/90 p-2 dark:bg-slate-900/90"
    >
      <I18nProvider locale={locale} namespaces={['Game.Field', 'UI.Metadata', 'UI.InPage.Pokedex.Info']}>
        <NavBarClient session={session} mapIds={mapIds}/>
      </I18nProvider>
      {noUserControl || <UserAuthControl locale={locale} session={session}/>}
    </Flex>
  );
};
