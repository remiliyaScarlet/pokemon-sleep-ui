'use client';
import React from 'react';

import {clsx} from 'clsx';
import {Session} from 'next-auth';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {useNavEntries} from '@/hooks/nav';
import {ThemeSwitcher} from '@/ui/base/navbar/darkMode/main';
import {NavEntryUI} from '@/ui/base/navbar/entry';
import {NavHomepage} from '@/ui/base/navbar/home';
import {LanguageSwitch} from '@/ui/base/navbar/languageSwitch/main';
import {UserSettingsUI} from '@/ui/base/navbar/userSettings/main';
import {UserSettingsProps} from '@/ui/base/navbar/userSettings/type';


type Props = Omit<UserSettingsProps, 'session'> & {
  session: Session | null,
};

export const NavBarClient = ({session, ...props}: Props) => {
  const t = useTranslations('UI.Metadata');

  const entries = useNavEntries();

  return (
    <>
      <NavHomepage/>
      <Flex direction="row" className={clsx(
        'scrollbar-hide gap-1 overflow-x-auto overflow-y-hidden',
        'text-center text-sm text-gray-400',
      )}>
        {entries.map(({i18nTextId, ...props}) => (
          <div key={i18nTextId} className="nav-height">
            <NavEntryUI alt={t(i18nTextId)} {...props}/>
          </div>
        ))}
      </Flex>
      <Flex direction="row" center noFullWidth className="ml-auto gap-1.5">
        {session && <UserSettingsUI session={session} {...props}/>}
        {!session && <LanguageSwitch/>}
        <ThemeSwitcher/>
      </Flex>
    </>
  );
};
