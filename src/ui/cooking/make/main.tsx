import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllMeals} from '@/controller/meal';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {CookingServerDataProps} from '@/ui/cooking/common/type';
import {toCookingPreloadedData} from '@/ui/cooking/common/utils';
import {MealMakerClient} from '@/ui/cooking/make/client';


export const MealMaker = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    session,
    meals,
    ingredientMap,
  ] = await Promise.all([
    getServerSession(authOptions),
    getAllMeals(),
    getAllIngredients(),
  ]);

  const props: CookingServerDataProps = {
    meals,
    ingredientMap,
    preloaded: toCookingPreloadedData(session),
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={['Game.MealType', 'Game.Food', 'UI.InPage.Cooking']}>
        <MealMakerClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
