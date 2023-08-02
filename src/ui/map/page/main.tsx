import React from 'react';

import {useTranslations} from 'next-intl';

import {MapPageParams} from '@/app/[locale]/map/[id]/page';
import {Loading} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex';
import {I18nProvider} from '@/contexts/i18n';
import {getPokemonAsMap} from '@/controller/pokemon';
import {getSleepStyleOfMap} from '@/controller/sleepStyle';
import {getSnorlaxRankOfMap} from '@/controller/snorlaxRank';
import {getSnorlaxReward} from '@/controller/snorlaxReward';
import {PageLayout} from '@/ui/base/layout';
import {MapInfo} from '@/ui/map/page/info';
import {MapMeta} from '@/ui/map/page/meta';
import {MapCommonProps} from '@/ui/map/page/type';
import {toUnique} from '@/utils/array';


type Props = {
  params: MapPageParams,
};

export const MapPage = ({params}: Props) => {
  const mapId = Number(params.id);
  const sleepStyles = React.use(getSleepStyleOfMap(mapId));
  const pokedexMap = React.use(getPokemonAsMap(toUnique(sleepStyles.map(({pokemonId}) => pokemonId))));
  const snorlaxRank = React.use(getSnorlaxRankOfMap(mapId));
  const snorlaxReward = React.use(getSnorlaxReward());

  const t = useTranslations('Game.Field');

  if (!snorlaxRank) {
    return <Loading text="Snorlax"/>;
  }

  const props: MapCommonProps = {
    mapId,
    mapName: t(mapId.toString()),
    sleepStyles,
    pokedexMap,
    snorlaxRank,
    snorlaxReward,
  };

  return (
    <PageLayout>
      <Flex direction="col" center className="gap-1.5">
        <MapMeta {...props}/>
        <I18nProvider namespaces={['Game', 'UI.InPage.Pokedex.Info', 'UI.InPage.Map', 'UI.Common']}>
          <MapInfo {...props}/>
        </I18nProvider>
      </Flex>
    </PageLayout>
  );
};
