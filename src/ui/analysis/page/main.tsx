import React from 'react';

import {getServerSession} from 'next-auth';

import {AnalysisPageParams} from '@/app/[locale]/analysis/[id]/page';
import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {authOptions} from '@/const/auth';
import {getAllBerryData} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getAllMapMeta} from '@/controller/mapMeta';
import {getAllPokemonAsArray} from '@/controller/pokemon/info';
import {getAllPokemonProducingParams} from '@/controller/pokemon/producing';
import {getSleepStyleNormalMap} from '@/controller/sleepStyle';
import {AnalysisPageClient} from '@/ui/analysis/page/client';
import {AnalysisPageCommonProps} from '@/ui/analysis/page/type';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {createUserSettings} from '@/utils/user/settings';


type Props = {
  params: AnalysisPageParams,
};

export const AnalysisPage = async ({params}: Props) => {
  const {id, locale} = params;
  const [
    session,
    pokemonList,
    pokemonProducingParamsMap,
    ingredientChainMap,
    ingredientMap,
    berryDataMap,
    sleepStyleMap,
    mapMeta,
  ] = await Promise.all([
    getServerSession(authOptions),
    getAllPokemonAsArray(),
    getAllPokemonProducingParams(),
    getIngredientChainMap(),
    getAllIngredients(),
    getAllBerryData(),
    getSleepStyleNormalMap(),
    getAllMapMeta(),
  ]);

  const pokemon = pokemonList.find((pokemon) => pokemon.id === Number(id));

  if (!pokemon) {
    return <Failed text="Pokemon"/>;
  }

  if (!berryDataMap) {
    return <Failed text="Berry"/>;
  }

  const props: AnalysisPageCommonProps = {
    pokemonList,
    pokemon,
    pokemonProducingParamsMap,
    ingredientMap,
    ingredientChainMap,
    berryDataMap,
    sleepStyleMap,
    mapMeta,
    preloadedSettings: createUserSettings(session?.user.preloaded.settings),
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.InPage.Analysis',
        'UI.InPage.Pokedex',
        'UI.Metadata',
      ]}>
        <AnalysisPageClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
