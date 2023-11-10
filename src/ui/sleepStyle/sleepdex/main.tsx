import React from 'react';

import {getServerSession} from 'next-auth';

import {AdsUnit} from '@/components/ads/main';
import {SignIn} from '@/components/auth/signIn';
import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getAllPokemonAsArray} from '@/controller/pokemon/info';
import {getSleepdexMap} from '@/controller/sleepdex';
import {getSleepStyleNormalMap} from '@/controller/sleepStyle';
import {getPokemonSleepStyleNoMapLookup} from '@/controller/sleepStyleNoMap';
import {DefaultPageProps} from '@/types/next/page/common';
import {LoginRequiredPageLayout} from '@/ui/base/layout/loginRequired';
import {SleepdexClient} from '@/ui/sleepStyle/sleepdex/client';
import {SleepdexDataProps} from '@/ui/sleepStyle/sleepdex/type';


export const Sleepdex = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  const session = await getServerSession(authOptions);

  if (!session) {
    return <SignIn/>;
  }

  const [
    pokemonList,
    sleepStyleMap,
    sleepStylesNoMapLookup,
    sleepdex,
  ] = await Promise.all([
    getAllPokemonAsArray(),
    getSleepStyleNormalMap(),
    getPokemonSleepStyleNoMapLookup(),
    getSleepdexMap(session.user.id),
  ]);

  const props: SleepdexDataProps = {
    pokemonList,
    sleepStyleMap,
    sleepStylesNoMapLookup,
    preloaded: {
      sleepdex,
    },
  };

  return (
    <LoginRequiredPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={['Game', 'UI.Metadata']}>
        <SleepdexClient {...props}/>
      </I18nProvider>
      <AdsUnit/>
    </LoginRequiredPageLayout>
  );
};
