import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {AuthProvider} from '@/contexts/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getAllMeals} from '@/controller/meal';
import {PageLayout} from '@/ui/base/layout';
import {MealIndexClient} from '@/ui/meal/index/client';


export const MealIndex = () => {
  const data = React.use(getAllMeals());
  const session = React.use(getServerSession(authOptions));

  return (
    <PageLayout>
      <I18nProvider namespaces={['Game', 'UI.InPage.Cooking']}>
        <AuthProvider>
          <MealIndexClient data={data} session={session}/>
        </AuthProvider>
      </I18nProvider>
    </PageLayout>
  );
};
