import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {AuthProvider} from '@/contexts/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllMeals} from '@/controller/meal';
import {PageLayout} from '@/ui/base/layout';
import {PotInfoClient} from '@/ui/info/pot/client';
import {PotInfoCommonProps} from '@/ui/info/pot/type';


export const PotInfo = () => {
  const meals = React.use(getAllMeals());
  const ingredients = React.use(getAllIngredients());
  const session = React.use(getServerSession(authOptions));

  const props: PotInfoCommonProps = {meals, ingredients, session};

  return (
    <PageLayout>
      <I18nProvider namespaces={['Game', 'UI.InPage.Cooking', 'UI.InPage.Info.Pot']}>
        <AuthProvider>
          <PotInfoClient {...props}/>
        </AuthProvider>
      </I18nProvider>
    </PageLayout>
  );
};
