import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllMeals} from '@/controller/meal';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {PotInfoClient} from '@/ui/info/pot/client';
import {PotInfoCommonProps} from '@/ui/info/pot/type';


export const PotInfo = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    session,
    meals,
    ingredients,
  ] = await Promise.all([
    getServerSession(authOptions),
    getAllMeals(),
    getAllIngredients(),
  ]);

  const props: PotInfoCommonProps = {
    meals,
    ingredients,
    preloaded: session?.user.preloaded.cooking,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={['Game', 'UI.InPage.Cooking', 'UI.InPage.Info.Pot']}>
        <PotInfoClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
