import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllMeals} from '@/controller/meal';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {MealMakerClient} from '@/ui/cooking/make/client';
import {MealMakerServerDataProps} from '@/ui/cooking/make/type';
import {createUserSettings} from '@/utils/user/settings';


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

  const props: MealMakerServerDataProps = {
    meals,
    ingredientMap,
    preloaded: {
      cooking: session?.user.preloaded.cooking,
      settings: createUserSettings(session?.user.preloaded.settings),
    },
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={['Game.MealType', 'Game.Food', 'UI.InPage.Cooking']}>
        <MealMakerClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
