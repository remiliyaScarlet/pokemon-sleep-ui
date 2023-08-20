import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllMeals} from '@/controller/meal';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {CookingClient} from '@/ui/cooking/client';


export const Cooking = () => {
  const meals = React.use(getAllMeals());
  const ingredientMap = React.use(getAllIngredients());
  const session = React.use(getServerSession(authOptions));

  return (
    <PublicPageLayout>
      <I18nProvider namespaces={['Game.MealType', 'Game.Food', 'UI.InPage.Cooking']}>
        <CookingClient meals={meals} ingredientMap={ingredientMap} session={session}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
