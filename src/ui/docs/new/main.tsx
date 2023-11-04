import React from 'react';

import {I18nProvider} from '@/contexts/i18n';
import {DefaultPageProps} from '@/types/next/page/common';
import {CmsModOnlyPageLayout} from '@/ui/base/layout/cmsModOnly';
import {DocsNewClient} from '@/ui/docs/new/client';


export const DocsNew = ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <CmsModOnlyPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'UI.InPage.Docs',
      ]}>
        <DocsNewClient locale={locale}/>
      </I18nProvider>
    </CmsModOnlyPageLayout>
  );
};
