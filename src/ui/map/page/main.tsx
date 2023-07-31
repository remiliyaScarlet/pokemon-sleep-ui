import React from 'react';

import {useTranslations} from 'next-intl';

import {MapPageParams} from '@/app/[locale]/map/[id]/page';
import {Flex} from '@/components/layout/flex';
import {I18nProvider} from '@/contexts/i18n';
import {getPokemonAsMap} from '@/controller/pokemon';
import {getSleepStyleOfMap} from '@/controller/sleepStyle';
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

  const t = useTranslations('Game.Field');

  const props: MapCommonProps = {mapId, mapName: t(mapId.toString()), sleepStyles, pokedexMap};

  return (
    <PageLayout>
      <Flex direction="col" center className="gap-1.5">
        <MapMeta {...props}/>
        <I18nProvider namespaces={['Game', 'UI.InPage.Pokedex.Info', 'UI.Common']}>
          <MapInfo {...props}/>
        </I18nProvider>
      </Flex>
    </PageLayout>
  );
};
