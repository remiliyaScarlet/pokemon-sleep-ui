import React from 'react';

import {getServerSession} from 'next-auth';

import {MapPageParams} from '@/app/[locale]/map/[id]/page';
import {Failed} from '@/components/icons/failed';
import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMapMeta} from '@/controller/mapMeta';
import {getPokemonAsMap} from '@/controller/pokemon/info';
import {getSleepdexMap} from '@/controller/sleepdex';
import {getSleepStyleNormalOfMap} from '@/controller/sleepStyle';
import {getSnorlaxRankOfMap} from '@/controller/snorlaxRank';
import {getSnorlaxReward} from '@/controller/snorlaxReward';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {MapPageClient} from '@/ui/sleepStyle/map/page/client';
import {MapPageServerDataProps} from '@/ui/sleepStyle/map/page/type';
import {toUnique} from '@/utils/array';


type Props = {
  params: MapPageParams,
};

export const MapPage = async ({params}: Props) => {
  const {id, locale} = params;
  const session = await getServerSession(authOptions);

  const mapId = Number(id);

  const sleepStyles = await getSleepStyleNormalOfMap(mapId);
  const [
    pokedexMap,
    ingredientChainMap,
    snorlaxRank,
    snorlaxReward,
    mapMeta,
    sleepdexMap,
  ] = await Promise.all([
    getPokemonAsMap(toUnique(sleepStyles.map(({pokemonId}) => pokemonId))),
    getIngredientChainMap(),
    getSnorlaxRankOfMap(mapId),
    getSnorlaxReward(),
    getMapMeta(mapId),
    getSleepdexMap(session?.user.id),
  ]);

  if (!snorlaxRank) {
    return <Failed text="Snorlax"/>;
  }

  const props: MapPageServerDataProps = {
    mapId,
    sleepStyles,
    pokedexMap,
    ingredientChainMap,
    snorlaxRank,
    snorlaxReward,
    mapMeta,
    sleepdexMap,
    isLoggedIn: !!session,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.InPage.Pokedex.Info',
        'UI.InPage.Pokedex.Input',
        'UI.InPage.Map',
        'UI.Common',
        'UI.Metadata',
      ]}>
        <MapPageClient locale={locale} {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
