import React from 'react';

import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {Grid} from '@/components/layout/grid';
import {MapLink} from '@/components/shared/map/link';
import {MapStats} from '@/ui/map/common/stats';
import {getSleepdexCompletion} from '@/ui/map/common/utils';
import {MapIndexServerDataProps} from '@/ui/map/index/type';


export const MapIndexContent = (props: MapIndexServerDataProps) => {
  const {data, mapMeta, isLoggedIn} = props;
  const t = useTranslations('Game.Field');

  const sleepdexCompletion = getSleepdexCompletion(props);

  return (
    <Flex direction="col" className="gap-1.5 md:px-32 md:pt-32">
      <AdsUnit/>
      <Grid className="grid-cols-1 gap-1.5 xl:grid-cols-2">
        {Object.entries(data).map(([mapIdStr, sleepStyles]) => {
          const mapId = Number(mapIdStr);

          return (
            <MapLink key={mapId} mapId={mapId} className="h-40">
              <Flex direction="col" className="gap-4">
                <div className="text-2xl">
                  {t(mapIdStr)}
                </div>
                <MapStats
                  sleepStyles={sleepStyles}
                  sleepdexCompletionOfMap={sleepdexCompletion[mapId]}
                  meta={mapMeta[mapId]}
                  isLoggedIn={isLoggedIn}
                />
              </Flex>
            </MapLink>
          );
        })}
      </Grid>
      <AdsUnit/>
    </Flex>
  );
};
