import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NavEntries} from '@/ui/base/navbar/const';
import {ThemeSwitcher} from '@/ui/base/navbar/darkMode/main';
import {NavEntryUI} from '@/ui/base/navbar/entry';
import {LanguageSwitch} from '@/ui/base/navbar/languageSwitch/main';


export const NavBar = () => {
  const t = useTranslations('UI.Metadata');

  return (
    <Flex direction="row" center className="border-b border-gray-700">
      <ul className="flex flex-wrap gap-1 text-center text-sm text-gray-400">
        {NavEntries.map(({i18nTextId, ...props}) => (
          <li key={i18nTextId} className="h-9">
            <NavEntryUI alt={t(i18nTextId)} {...props}/>
          </li>
        ))}
      </ul>
      <Flex direction="row" className="ml-auto" center noFullWidth>
        <LanguageSwitch/>
        <ThemeSwitcher/>
      </Flex>
    </Flex>
  );
};
