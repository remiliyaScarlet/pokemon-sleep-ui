import React from 'react';

import {getServerSession} from 'next-auth';

import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllMeals} from '@/controller/meal';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {MealIndexClient} from '@/ui/meal/index/client';
import {MealDataProps} from '@/ui/meal/index/type';
import {createUserSettings} from '@/utils/user/settings';


export const MealIndex = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    meals,
    ingredientMap,
    session,
  ] = await Promise.all([
    getAllMeals(),
    getAllIngredients(),
    getServerSession(authOptions),
  ]);

  const props: MealDataProps = {
    meals,
    ingredientMap,
    preloaded: {
      cooking: session?.user.preloaded.cooking,
      settings: createUserSettings(session?.user.preloaded.settings),
    },
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={['Game', 'UI.InPage.Cooking']}>
        <MealIndexClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
