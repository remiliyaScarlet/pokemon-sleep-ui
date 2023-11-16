import React from 'react';

import {notFound} from 'next/navigation';

import {I18nProvider} from '@/components/i18n/provider';
import {getDocBySlugForEdit} from '@/controller/docs';
import {PageProps} from '@/types/next/page/common';
import {DocsPageParams} from '@/types/next/page/docs';
import {CmsModOnlyPageLayout} from '@/ui/base/layout/cmsModOnly';
import {DocsEditClient} from '@/ui/docs/edit/client';


export const DocsEdit = async ({params}: PageProps<DocsPageParams>) => {
  const {locale} = params;

  const doc = await getDocBySlugForEdit(params);

  if (!doc) {
    return notFound();
  }

  return (
    <CmsModOnlyPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'UI.InPage.Docs',
      ]}>
        <DocsEditClient locale={locale} initialDoc={doc}/>
      </I18nProvider>
    </CmsModOnlyPageLayout>
  );
};
