import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllMeals} from '@/controller/meal';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {PotInfoClient} from '@/ui/info/pot/client';
import {PotInfoCommonProps} from '@/ui/info/pot/type';


export const PotInfo = () => {
  const meals = React.use(getAllMeals());
  const ingredients = React.use(getAllIngredients());
  const session = React.use(getServerSession(authOptions));

  const props: PotInfoCommonProps = {meals, ingredients, session};

  return (
    <PublicPageLayout>
      <I18nProvider namespaces={['Game', 'UI.InPage.Cooking', 'UI.InPage.Info.Pot']}>
        <PotInfoClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
