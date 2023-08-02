import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {MapLink} from '@/components/shared/map/link';
import {getSleepStyleByMaps} from '@/controller/sleepStyle';
import {PageLayout} from '@/ui/base/layout';
import {MapStats} from '@/ui/map/common/stats';


export const MapIndex = () => {
  const data = React.use(getSleepStyleByMaps());

  const t = useTranslations('Game.Field');

  return (
    <PageLayout>
      <Flex direction="row" center wrap className="gap-1.5">
        {Object.entries(data).map(([mapId, sleepStyles]) => {
          const mapName = t(mapId.toString());

          return (
            <Flex
              key={mapId} direction="col" noFullWidth
              className="width-with-gap md:width-with-gap-2-items"
            >
              <MapLink mapId={mapId} className="h-40">
                <Flex direction="col" className="z-10">
                  <h4 className="text-xl">
                    {mapName}
                  </h4>
                  <MapStats sleepStyles={sleepStyles}/>
                </Flex>
              </MapLink>
            </Flex>
          );
        })}
      </Flex>
    </PageLayout>
  );
};
