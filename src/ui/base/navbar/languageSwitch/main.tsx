import React from 'react';

import {I18nProvider} from '@/contexts/i18n';
import {LanguageSwitchClient} from '@/ui/base/navbar/languageSwitch/client';


export const LanguageSwitch = () => {
  return (
    <I18nProvider namespaces={[]}>
      <LanguageSwitchClient/>
    </I18nProvider>
  );
};
