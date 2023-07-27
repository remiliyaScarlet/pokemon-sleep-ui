import React from 'react';

import {pick} from 'lodash';
import {NextIntlClientProvider, useLocale, useMessages} from 'next-intl';

import {Loading} from '@/components/icons/loading';
import {getAllMeals} from '@/controller/meal';
import {PageLayout} from '@/ui/base/layout';
import {MealIndexClient} from '@/ui/meal/index/client';


export const MealIndex = () => {
  const locale = useLocale();
  const messages = useMessages();

  const data = React.use(getAllMeals());

  return (
    <PageLayout>
      {messages ?
        <NextIntlClientProvider
          locale={locale}
          messages={pick(messages, 'Game', 'UI.InPage.Meal', 'UI.Game.MealType')}
        >
          <MealIndexClient data={data}/>
        </NextIntlClientProvider> :
        <Loading text="Pokedex"/>}
    </PageLayout>
  );
};
