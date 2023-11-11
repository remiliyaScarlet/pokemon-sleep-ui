import React from 'react';

import {getServerSession} from 'next-auth';

import {AdsUnit} from '@/components/ads/main';
import {Failed} from '@/components/icons/failed';
import {Flex} from '@/components/layout/flex/common';
import {MapUniqueWarning} from '@/components/shared/sleepStyle/common/uniqueWarning';
import {MapPageClient} from '@/components/shared/sleepStyle/page/client';
import {MapPageServerDataProps} from '@/components/shared/sleepStyle/page/type';
import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMapMeta} from '@/controller/mapMeta';
import {getPokemonAsMap} from '@/controller/pokemon/info';
import {getSleepdexMap} from '@/controller/sleepdex';
import {getSnorlaxRankOfMap} from '@/controller/snorlaxRank';
import {getSnorlaxReward} from '@/controller/snorlaxReward';
import {SleepStyleNormalFlattened} from '@/types/game/sleepStyle';
import {Locale} from '@/types/next/locale';
import {toUnique} from '@/utils/array';


type Props = {
  locale: Locale,
  mapId: number,
  getDataPromise: (mapId: number) => Promise<SleepStyleNormalFlattened[]>,
  isUnique?: boolean,
};

export const MapPage = async ({locale, mapId, getDataPromise, isUnique}: Props) => {
  const session = await getServerSession(authOptions);

  const sleepStyles = await getDataPromise(mapId);
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
    <Flex className="gap-1.5 self-center md:w-3/4">
      <AdsUnit/>
      {isUnique && <MapUniqueWarning/>}
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
      <AdsUnit/>
    </Flex>
  );
};
