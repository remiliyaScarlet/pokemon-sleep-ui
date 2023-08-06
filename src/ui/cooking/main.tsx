import React from 'react';

import {getServerSession} from 'next-auth';

import {Loading} from '@/components/icons/loading';
import {authOptions} from '@/const/auth';
import {AuthProvider} from '@/contexts/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllMeals} from '@/controller/meal';
import {PageLayout} from '@/ui/base/layout';
import {CookingClient} from '@/ui/cooking/client';


export const Cooking = () => {
  const meals = React.use(getAllMeals());
  const ingredientMap = React.use(getAllIngredients());
  const session = React.use(getServerSession(authOptions));

  if (!session) {
    return <Loading text="Session"/>;
  }

  return (
    <PageLayout>
      <I18nProvider namespaces={['Game.MealType', 'Game.Food', 'UI.InPage.Cooking']}>
        <AuthProvider>
          <CookingClient meals={meals} ingredientMap={ingredientMap} session={session}/>
        </AuthProvider>
      </I18nProvider>
    </PageLayout>
  );
};
