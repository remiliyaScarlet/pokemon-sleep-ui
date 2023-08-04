'use client';
import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {useNavEntries} from '@/hooks/nav';
import {ThemeSwitcher} from '@/ui/base/navbar/darkMode/main';
import {NavEntryUI} from '@/ui/base/navbar/entry';
import {NavHomepage} from '@/ui/base/navbar/home';
import {LanguageSwitch} from '@/ui/base/navbar/languageSwitch/main';
import {classNames} from '@/utils/react';

import styles from './main.module.css';


export const NavBar = () => {
  const t = useTranslations('UI.Metadata');

  const entries = useNavEntries();

  return (
    <Flex
      direction="row" center
      className="sticky top-0 z-30 gap-1.5 border-b border-b-gray-700 bg-slate-300/90 p-2 dark:bg-slate-900/90"
    >
      <NavHomepage/>
      <Flex direction="row" className={classNames(
        'scrollbar-hide gap-1 overflow-x-auto overflow-y-hidden',
        'text-center text-sm text-gray-400',
      )}>
        {entries.map(({i18nTextId, ...props}) => (
          <div key={i18nTextId} className={styles['nav-height']}>
            <NavEntryUI alt={t(i18nTextId)} {...props}/>
          </div>
        ))}
      </Flex>
      <Flex direction="row" center noFullWidth className="ml-auto gap-1.5">
        <LanguageSwitch/>
        <ThemeSwitcher/>
      </Flex>
    </Flex>
  );
};
