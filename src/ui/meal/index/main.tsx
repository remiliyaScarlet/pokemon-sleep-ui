import React from 'react';

import {I18nProvider} from '@/contexts/i18n';
import {getAllMeals} from '@/controller/meal';
import {PageLayout} from '@/ui/base/layout';
import {MealIndexClient} from '@/ui/meal/index/client';


export const MealIndex = () => {
  const data = React.use(getAllMeals());

  return (
    <PageLayout>
      <I18nProvider namespaces={['Game', 'UI.InPage.Cooking']}>
        <MealIndexClient data={data}/>
      </I18nProvider>
    </PageLayout>
  );
};
