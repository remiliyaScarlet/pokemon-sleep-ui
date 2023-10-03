'use client';
import React from 'react';

import {Session} from 'next-auth';

import {Flex} from '@/components/layout/flex/common';
import {UserAuthControl} from '@/ui/base/navbar/auth';
import {ThemeSwitcher} from '@/ui/base/navbar/darkMode/main';
import {LanguageSwitch} from '@/ui/base/navbar/languageSwitch/main';
import {NavList} from '@/ui/base/navbar/list/main';
import {NavBarCommonProps} from '@/ui/base/navbar/type';
import {UserSettingsUI} from '@/ui/base/navbar/userSettings/main';
import {UserSettingsProps} from '@/ui/base/navbar/userSettings/type';


type Props = Omit<UserSettingsProps, 'session'> & Pick<NavBarCommonProps, 'noUserControl'> & {
  session: Session | null,
};

export const NavBarClient = ({session, noUserControl, ...props}: Props) => {
  return (
    <>
      <Flex direction="row" noFullWidth className="shrink-0 p-2">
        <NavList/>
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
