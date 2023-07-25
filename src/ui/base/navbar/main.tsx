import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NavEntries} from '@/ui/base/navbar/const';
import {ThemeSwitcher} from '@/ui/base/navbar/darkMode/main';
import {NavEntryUI} from '@/ui/base/navbar/entry';
import {NavHomepage} from '@/ui/base/navbar/home';
import {LanguageSwitch} from '@/ui/base/navbar/languageSwitch/main';
import {navItemHeightClass} from '@/ui/base/navbar/styles';


export const NavBar = () => {
  const t = useTranslations('UI.Metadata');

  return (
    <Flex direction="row" center className="gap-1.5">
      <ul className="flex flex-wrap gap-1 text-center text-sm text-gray-400">
        <NavHomepage/>
        {NavEntries.map(({i18nTextId, ...props}) => (
          <li key={i18nTextId} className={navItemHeightClass}>
            <NavEntryUI alt={t(i18nTextId)} {...props}/>
          </li>
        ))}
      </ul>
      <Flex direction="row" center noFullWidth className="ml-auto gap-1.5">
        <LanguageSwitch/>
        <ThemeSwitcher/>
      </Flex>
    </Flex>
  );
};
