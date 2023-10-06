import React from 'react';

import {I18nProvider} from '@/contexts/i18n';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {EnergyAnalysisClient} from '@/ui/energy/client';


export const EnergyAnalysis = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[]}>
        <EnergyAnalysisClient/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
