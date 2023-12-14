import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {MapStats} from '@/components/shared/sleepStyle/common/stats';
import {getSleepdexCompletionOfMap} from '@/components/shared/sleepStyle/common/utils';
import {MapCommonProps} from '@/components/shared/sleepStyle/page/type';
import {imageGallerySizes} from '@/styles/image';


export const MapMeta = ({mapId, mapName, sleepStyles, sleepdexMap, mapMeta, isLoggedIn}: MapCommonProps) => {
  return (
    <Flex className="relative h-52">
      <NextImage
        src={`/images/field/${mapId}.png`} alt={mapName}
        sizes={imageGallerySizes} className="rounded-lg opacity-50 dark:opacity-25"
      />
      <Flex center className="z-10 h-full gap-4 p-1.5">
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
