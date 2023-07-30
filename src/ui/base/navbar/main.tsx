'use client';
import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {useNavEntries} from '@/hooks/nav';
import {ThemeSwitcher} from '@/ui/base/navbar/darkMode/main';
import {NavEntryUI} from '@/ui/base/navbar/entry';
import {NavHomepage} from '@/ui/base/navbar/home';
import {LanguageSwitch} from '@/ui/base/navbar/languageSwitch/main';

import styles from './main.module.css';


export const NavBar = () => {
  const t = useTranslations('UI.Metadata');

  const entries = useNavEntries();

  return (
    <Flex
      direction="row" center
      className="sticky top-0 z-50 gap-1.5 border-b border-b-gray-700 bg-slate-300/90 p-2 dark:bg-slate-900/90"
    >
      <ul className="flex flex-wrap gap-1 text-center text-sm text-gray-400">
        <NavHomepage/>
        {entries.map(({i18nTextId, ...props}) => (
          <li key={i18nTextId} className={styles['nav-height']}>
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
