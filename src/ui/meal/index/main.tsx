import React from 'react';

import {getAllMeals} from '@/controller/meal';
import {PageLayout} from '@/ui/base/layout';
import {I18nProvider} from '@/ui/cooking/i18n';
import {MealIndexClient} from '@/ui/meal/index/client';


export const MealIndex = () => {
  const data = React.use(getAllMeals());

  return (
    <PageLayout>
      <I18nProvider namespaces={['Game', 'UI.InPage.Meal', 'UI.Game.MealType']}>
        <MealIndexClient data={data}/>
      </I18nProvider>
    </PageLayout>
  );
};
