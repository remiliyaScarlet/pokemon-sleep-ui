'use client';
import React from 'react';

import {clsx} from 'clsx';
import {Session} from 'next-auth';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {useNavEntries} from '@/hooks/nav';
import {UserAuthControl} from '@/ui/base/navbar/auth';
import {ThemeSwitcher} from '@/ui/base/navbar/darkMode/main';
import {NavEntryUI} from '@/ui/base/navbar/entry';
import {LanguageSwitch} from '@/ui/base/navbar/languageSwitch/main';
import {NavList} from '@/ui/base/navbar/list/main';
import {NavBarCommonProps} from '@/ui/base/navbar/type';
import {UserSettingsUI} from '@/ui/base/navbar/userSettings/main';
import {UserSettingsProps} from '@/ui/base/navbar/userSettings/type';


type Props = Omit<UserSettingsProps, 'session'> & Pick<NavBarCommonProps, 'noUserControl'> & {
  session: Session | null,
};

export const NavBarClient = ({session, noUserControl, ...props}: Props) => {
  const t = useTranslations('UI.Metadata');

  const entries = useNavEntries();

  return (
    <>
      <Flex direction="row" noFullWidth className={clsx(
        'scrollbar-hide gap-1 overflow-x-auto overflow-y-hidden',
        'shrink-0 p-2 text-center text-sm text-gray-400',
      )}>
        <NavList/>
        {entries.map(({i18nTextId, ...props}) => (
          <div key={i18nTextId} className="nav-height">
            <NavEntryUI alt={t(i18nTextId)} {...props}/>
          </div>
        ))}
      </Flex>
      <Flex direction="row" center noFullWidth className="ml-auto gap-1.5 p-2">
        {session && <UserSettingsUI session={session} {...props}/>}
        {!session && <LanguageSwitch/>}
        <ThemeSwitcher/>
        {noUserControl || <UserAuthControl session={session}/>}
      </Flex>
    </>
  );
};
