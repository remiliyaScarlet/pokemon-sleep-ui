import React from 'react';

import {I18nProvider} from '@/contexts/i18n';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllMeals} from '@/controller/meal';
import {PageLayout} from '@/ui/base/layout';
import {PotInfoClient} from '@/ui/info/pot/client';
import {PotInfoCommonProps} from '@/ui/info/pot/type';


export const PotInfo = () => {
  const meals = React.use(getAllMeals());
  const ingredients = React.use(getAllIngredients());

  const props: PotInfoCommonProps = {meals, ingredients};

  return (
    <PageLayout>
      <I18nProvider namespaces={['Game', 'UI.InPage.Cooking', 'UI.InPage.Info.Pot']}>
        <PotInfoClient {...props}/>
      </I18nProvider>
    </PageLayout>
  );
};
