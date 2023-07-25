import React from 'react';

import {pick} from 'lodash';
import {NextIntlClientProvider, useLocale, useMessages} from 'next-intl';

import {Loading} from '@/components/icons/loading';
import {getAllPokedex} from '@/controller/pokemonInfo';
import {getPokemonSleepStyleMap} from '@/controller/sleepStyle';
import {PageLayout} from '@/ui/base/layout';
import {PokedexClient} from '@/ui/pokedex/index/client';
import {PokedexData} from '@/ui/pokedex/index/type';


export const getPokedexData = async (): Promise<PokedexData> => {
  const sleepStyleMap = await getPokemonSleepStyleMap();

  return (await getAllPokedex())
    .map(({id, type, sleepType, berry, skill, ingredients}) => ({
      id,
      type,
      sleepType,
      berry,
      skill,
      ingredients,
      sleepStyles: sleepStyleMap[id] ?? [],
    }))
    .toArray();
};

export const Pokedex = () => {
  const locale = useLocale();
  const messages = useMessages();

  const pokedexData = React.use(getPokedexData());

  return (
    <PageLayout>
      {pokedexData && messages ?
        <NextIntlClientProvider locale={locale} messages={pick(messages, 'Game', 'UI.InPage.Pokedex')}>
          <PokedexClient data={pokedexData}/>
        </NextIntlClientProvider> :
        <Loading text="Pokedex"/>}
    </PageLayout>
  );
};
