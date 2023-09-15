import React from 'react';

import {MapPageParams} from '@/app/[locale]/map/[id]/page';
import {Failed} from '@/components/icons/failed';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMapMeta} from '@/controller/mapMeta';
import {getPokemonAsMap} from '@/controller/pokemon/info';
import {getSleepStyleOfMap} from '@/controller/sleepStyle';
import {getSnorlaxRankOfMap} from '@/controller/snorlaxRank';
import {getSnorlaxReward} from '@/controller/snorlaxReward';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {MapPageContent} from '@/ui/map/page/content';
import {MapCommonProps} from '@/ui/map/page/type';
import {toUnique} from '@/utils/array';


type Props = {
  params: MapPageParams,
};

export const MapPage = async ({params}: Props) => {
  const {id, locale} = params;
  const mapId = Number(id);

  const sleepStyles = await getSleepStyleOfMap(mapId);
  const [
    pokedexMap,
    ingredientChainMap,
    snorlaxRank,
    snorlaxReward,
    mapMeta,
  ] = await Promise.all([
    getPokemonAsMap(toUnique(sleepStyles.map(({pokemonId}) => pokemonId))),
    getIngredientChainMap(),
    getSnorlaxRankOfMap(mapId),
    getSnorlaxReward(),
    getMapMeta(mapId),
  ]);

  if (!snorlaxRank) {
    return <Failed text="Snorlax"/>;
  }

  const props: Omit<MapCommonProps, 'mapName'> = {
    mapId,
    sleepStyles,
    pokedexMap,
    ingredientChainMap,
    snorlaxRank,
    snorlaxReward,
    mapMeta,
  };

  return (
    <PublicPageLayout locale={locale}>
      <MapPageContent locale={locale} {...props}/>
    </PublicPageLayout>
  );
};
