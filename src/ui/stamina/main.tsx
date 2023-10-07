import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {defaultStaminaCalcConfig} from '@/const/user/settings';
import {I18nProvider} from '@/contexts/i18n';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {StaminaAnalysisClient} from '@/ui/stamina/client';
import {cloneMerge} from '@/utils/object/cloneMerge';


export const StaminaAnalysis = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    session,
  ] = await Promise.all([
    getServerSession(authOptions),
  ]);

  const preloadedStaminaConfig = cloneMerge(
    defaultStaminaCalcConfig,
    session?.user.preloaded.settings?.stamina,
  );

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={['UI.Common', 'UI.Stamina']}>
        <StaminaAnalysisClient preloadedStaminaConfig={preloadedStaminaConfig}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
