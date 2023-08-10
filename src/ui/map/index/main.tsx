import React from 'react';

import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {MapLink} from '@/components/shared/map/link';
import {getAllMapMeta} from '@/controller/mapMeta';
import {getSleepStyleByMaps} from '@/controller/sleepStyle';
import {PageLayout} from '@/ui/base/layout';
import {MapStats} from '@/ui/map/common/stats';


export const MapIndex = () => {
  const data = React.use(getSleepStyleByMaps());
  const mapMeta = React.use(getAllMapMeta());

  const t = useTranslations('Game.Field');

  return (
    <PageLayout>
      <Flex direction="col" className="gap-1.5 md:px-32 md:pt-32">
        <AdsUnit/>
        <Flex direction="row" center wrap className="gap-1.5">
          {Object.entries(data).map(([mapId, sleepStyles]) => {
            const mapName = t(mapId.toString());

            return (
              <Flex
                key={mapId} direction="col" noFullWidth
                className="width-with-gap md:width-with-gap-2-items"
              >
                <MapLink mapId={mapId} className="h-40">
                  <Flex direction="col" className="z-10 gap-4">
                    <div className="text-2xl">
                      {mapName}
                    </div>
                    <MapStats sleepStyles={sleepStyles} meta={mapMeta[Number(mapId)]}/>
                  </Flex>
                </MapLink>
              </Flex>
            );
          })}
        </Flex>
        <AdsUnit/>
      </Flex>
    </PageLayout>
  );
};
