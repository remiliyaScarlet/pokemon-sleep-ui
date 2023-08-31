import React from 'react';

import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {I18nProvider} from '@/contexts/i18n';
import {SleepMapId} from '@/types/game/sleepStyle';
import {Locale} from '@/types/next/locale';
import {MapInfo} from '@/ui/map/page/info';
import {MapMeta} from '@/ui/map/page/meta';
import {MapCommonProps} from '@/ui/map/page/type';


type Props = Omit<MapCommonProps, 'mapName'> & {
  mapId: SleepMapId,
  locale: Locale,
};

export const MapPageContent = ({locale, ...props}: Props) => {
  const t = useTranslations('Game.Field');

  const {mapId} = props;
  const mapName = t(mapId.toString());

  return (
    <Flex direction="col" center>
      <Flex direction="col" className="gap-1.5 md:w-3/4">
        <MapMeta mapName={mapName} {...props}/>
        <AdsUnit/>
        <I18nProvider locale={locale} namespaces={[
          'Game',
          'UI.InPage.Pokedex.Info',
          'UI.InPage.Map',
          'UI.Common',
        ]}>
          <MapInfo mapName={mapName} {...props}/>
        </I18nProvider>
        <AdsUnit/>
      </Flex>
    </Flex>
  );
};
