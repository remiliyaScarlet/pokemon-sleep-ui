import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {AuthProvider} from '@/contexts/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getAllBerryData, getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllPokedex} from '@/controller/pokemon';
import {getPokemonSleepStyleMap} from '@/controller/sleepStyle';
import {PageLayout} from '@/ui/base/layout';
import {PokedexClient} from '@/ui/pokedex/index/client';
import {PokedexClientCommonProps, PokedexData} from '@/ui/pokedex/index/type';


const getPokedexData = async (): Promise<PokedexData> => {
  const sleepStyleMap = await getPokemonSleepStyleMap();

  return (await getAllPokedex())
    .map((pokemon) => ({
      ...pokemon,
      sleepStyles: sleepStyleMap[pokemon.id] ?? [],
    }))
    .toArray();
};

export const Pokedex = () => {
  const pokedex = React.use(getPokedexData());
  const maxLevel = React.use(getPokemonMaxLevelByBerry());
  const ingredientMap = React.use(getAllIngredients());
  const berryMap = React.use(getAllBerryData());
  const session = React.use(getServerSession(authOptions));

  const props: PokedexClientCommonProps = {
    pokedex,
    maxLevel,
    ingredientMap,
    berryMap,
    session,
  };

  return (
    <PageLayout>
      <I18nProvider namespaces={['Game', 'UI.Common', 'UI.Metadata', 'UI.InPage.Pokedex']}>
        <AuthProvider>
          <PokedexClient {...props}/>
        </AuthProvider>
      </I18nProvider>
    </PageLayout>
  );
};
