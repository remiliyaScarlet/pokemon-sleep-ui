import React from 'react';

import {getServerSession} from 'next-auth';

import {Announcements} from '@/components/announcement/main';
import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getMapIds} from '@/controller/mapMeta';
import {NavBarClient} from '@/ui/base/navbar/client';
import {NavBarCommonProps} from '@/ui/base/navbar/type';


type Props = NavBarCommonProps & {
  announcement: boolean,
};

export const NavBar = ({noUserControl, locale, announcement}: Props) => {
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
      <NavBarClient session={session} mapIds={mapIds} noUserControl={noUserControl}>
        {announcement && <Announcements showOn="landscape"/>}
      </NavBarClient>
    </I18nProvider>
  );
};
