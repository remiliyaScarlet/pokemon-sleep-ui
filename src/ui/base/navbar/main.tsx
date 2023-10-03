import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getMapIds} from '@/controller/mapMeta';
import {NavBarClient} from '@/ui/base/navbar/client';
import {NavBarCommonProps} from '@/ui/base/navbar/type';


export const NavBar = ({noUserControl, locale}: NavBarCommonProps) => {
  const [
    session,
    mapIds,
  ] = React.use(Promise.all([
    getServerSession(authOptions),
    getMapIds(),
  ]));

  return (
    <I18nProvider locale={locale} namespaces={[
      'Game.Field',
      'UI.InPage.Pokedex.Info',
      'UI.Metadata',
      'UI.Stamina',
      'UI.UserControl',
    ]}>
      <NavBarClient session={session} mapIds={mapIds} noUserControl={noUserControl}/>
    </I18nProvider>
  );
};
