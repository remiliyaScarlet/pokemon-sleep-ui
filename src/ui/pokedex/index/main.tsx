import React from 'react';

import {I18nProvider} from '@/contexts/i18n';
import {getAllPokedex} from '@/controller/pokemonInfo';
import {getPokemonSleepStyleMap} from '@/controller/sleepStyle';
import {PageLayout} from '@/ui/base/layout';
import {PokedexClient} from '@/ui/pokedex/index/client';
import {PokedexData} from '@/ui/pokedex/index/type';


const getPokedexData = async (): Promise<PokedexData> => {
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
  const pokedexData = React.use(getPokedexData());

  return (
    <PageLayout>
      <I18nProvider namespaces={['Game', 'UI.InPage.Pokedex']}>
        <PokedexClient data={pokedexData}/>
      </I18nProvider>
    </PageLayout>
  );
};
