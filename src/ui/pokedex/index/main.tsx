import React from 'react';

import {getServerSession} from 'next-auth';

import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getAllBerryData, getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getAllMapMeta} from '@/controller/mapMeta';
import {getAllPokemonAsArray} from '@/controller/pokemon/info';
import {getAllPokemonProducingParams} from '@/controller/pokemon/producing';
import {getSleepStyleNormalMap} from '@/controller/sleepStyle';
import {locales} from '@/types/next/locale';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {PokedexClient} from '@/ui/pokedex/index/client';
import {PokedexClientCommonProps, PokedexData, PokemonInfoForPokedex} from '@/ui/pokedex/index/type';
import {getI18nTranslator, isLocale} from '@/utils/i18n';
import {createUserSettings} from '@/utils/user/settings';


const getPokedexData = async (): Promise<PokedexData> => {
  const sleepStyleMap = await getSleepStyleNormalMap();
  const translators = await Promise.all(
    locales
      .filter(isLocale)
      .map((locale) => getI18nTranslator({locale, namespace: 'Game.PokemonName'})),
  );

  return (await getAllPokemonAsArray())
    .map((pokemon) => ({
      ...pokemon,
      sleepStyles: sleepStyleMap[pokemon.id] ?? [],
      nameOfAllLocale: translators.map((t) => t(pokemon.id.toString())),
    } satisfies PokemonInfoForPokedex));
};

export const Pokedex = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    session,
    pokedex,
    pokemonProducingParamsMap,
    maxLevel,
    ingredientMap,
    ingredientChainMap,
    berryDataMap,
    mapMeta,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokedexData(),
    getAllPokemonProducingParams(),
    getPokemonMaxLevelByBerry(),
    getAllIngredients(),
    getIngredientChainMap(),
    getAllBerryData(),
    getAllMapMeta(),
  ]);

  const props: PokedexClientCommonProps = {
    pokedex,
    pokemonProducingParamsMap,
    maxLevel,
    ingredientMap,
    ingredientChainMap,
    berryDataMap,
    mapMeta,
    preloaded: {
      settings: createUserSettings(session?.user.preloaded.settings),
      display: session?.user.preloaded.pokedex,
    },
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={['Game', 'UI.Common', 'UI.Metadata', 'UI.InPage.Pokedex']}>
        <PokedexClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
