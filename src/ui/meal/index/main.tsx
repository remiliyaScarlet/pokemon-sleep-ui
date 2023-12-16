import React from 'react';

import {getServerSession} from 'next-auth';

import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getIngredientMap} from '@/controller/ingredient';
import {getMealMap} from '@/controller/meal';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {MealIndexClient} from '@/ui/meal/index/client';
import {MealDataProps} from '@/ui/meal/index/type';
import {createUserSettingsBundle} from '@/utils/user/settings/create';


export const MealIndex = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    session,
    mealMap,
    ingredientMap,
  ] = await Promise.all([
    getServerSession(authOptions),
    getMealMap(),
    getIngredientMap(),
  ]);

  const props: MealDataProps = {
    mealMap,
    ingredientMap,
    preloaded: createUserSettingsBundle(session),
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={['Game', 'UI.InPage.Cooking']}>
        <MealIndexClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
