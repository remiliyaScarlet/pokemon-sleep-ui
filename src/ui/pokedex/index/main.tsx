import React from 'react';

import {getServerSession} from 'next-auth';
import {getTranslator} from 'next-intl/server';

import {authOptions} from '@/const/auth';
import {locales} from '@/const/website';
import {AuthProvider} from '@/contexts/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getAllBerryData, getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllPokemonAsCursor} from '@/controller/pokemon';
import {getPokemonSleepStyleMap} from '@/controller/sleepStyle';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {PokedexClient} from '@/ui/pokedex/index/client';
import {PokedexClientCommonProps, PokedexData, PokemonInfoForPokedex} from '@/ui/pokedex/index/type';


const getPokedexData = async (): Promise<PokedexData> => {
  const sleepStyleMap = await getPokemonSleepStyleMap();
  const translators = await Promise.all(locales.map((locale) => getTranslator(locale, 'Game.PokemonName')));

  return (await getAllPokemonAsCursor())
    .map((pokemon) => ({
      ...pokemon,
      sleepStyles: sleepStyleMap[pokemon.id] ?? [],
      nameOfAllLocale: translators.map((t) => t(pokemon.id.toString())),
    } satisfies PokemonInfoForPokedex))
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
    <PublicPageLayout>
      <I18nProvider namespaces={['Game', 'UI.Common', 'UI.Metadata', 'UI.InPage.Pokedex']}>
        <AuthProvider>
          <PokedexClient {...props}/>
        </AuthProvider>
      </I18nProvider>
    </PublicPageLayout>
  );
};
