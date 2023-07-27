import React from 'react';

import {I18nProvider} from '@/contexts/i18n';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllMeals} from '@/controller/meal';
import {PageLayout} from '@/ui/base/layout';
import {CookingClient} from '@/ui/cooking/client';


export const Cooking = () => {
  const meals = React.use(getAllMeals());
  const ingredients = React.use(getAllIngredients());

  return (
    <PageLayout>
      <I18nProvider namespaces={['Game.MealType', 'Game.Food', 'UI.InPage.Cooking']}>
        <CookingClient meals={meals} ingredients={ingredients}/>
      </I18nProvider>
    </PageLayout>
  );
};
