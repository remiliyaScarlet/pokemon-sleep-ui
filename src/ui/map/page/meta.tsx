import React from 'react';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageGallerySizes} from '@/styles/image';
import {MapStats} from '@/ui/map/common/stats';
import {getSleepdexCompletionOfMap} from '@/ui/map/common/utils';
import {MapCommonProps} from '@/ui/map/page/type';


export const MapMeta = ({mapId, mapName, sleepStyles, sleepdexMap, mapMeta, isLoggedIn}: MapCommonProps) => {
  return (
    <Flex direction="col" className="relative h-52">
      <NextImage
        src={`/images/field/${mapId}.png`} alt={mapName}
        sizes={imageGallerySizes} className="rounded-xl opacity-50 dark:opacity-25"
      />
      <Flex direction="col" center className="z-10 h-full gap-4 p-1.5">
        <div className="text-3xl">
          {mapName}
        </div>
        <MapStats
          sleepStyles={sleepStyles}
          sleepdexCompletionOfMap={getSleepdexCompletionOfMap({sleepStyles, sleepdexMap})}
          meta={mapMeta}
          isLoggedIn={isLoggedIn}
        />
      </Flex>
    </Flex>
  );
};
