import React from 'react';

import {useTranslations} from 'next-intl';

import {Row} from '@/components/layout/row';
import {LanguageSwitch} from '@/ui/base/languageSwitch/main';
import {NavEntries} from '@/ui/base/navbar/const';
import {NavEntryUI} from '@/ui/base/navbar/entry';


export const NavBar = () => {
  const t = useTranslations('UI.Metadata');

  return (
    <Row className="items-center border-b border-gray-700">
      <ul className="flex flex-wrap gap-1 text-center text-sm text-gray-400">
        {NavEntries.map(({i18nTextId, ...props}) => (
          <li key={i18nTextId} className="h-9">
            <NavEntryUI alt={t(i18nTextId)} {...props}/>
          </li>
        ))}
      </ul>
      <div className="ml-auto self-center">
        <LanguageSwitch/>
      </div>
    </Row>
  );
};
