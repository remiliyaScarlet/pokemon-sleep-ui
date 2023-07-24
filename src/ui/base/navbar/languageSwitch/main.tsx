import React from 'react';

import {useLocale} from 'next-intl';

import {LanguageSwitchClient} from '@/ui/base/navbar/languageSwitch/client';


export const LanguageSwitch = () => {
  const locale = useLocale();

  return <LanguageSwitchClient locale={locale}/>;
};
