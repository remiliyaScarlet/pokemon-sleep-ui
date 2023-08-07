import React from 'react';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageGallerySizes} from '@/styles/image';
import {MapStats} from '@/ui/map/common/stats';
import {MapCommonProps} from '@/ui/map/page/type';


export const MapMeta = ({mapId, mapName, sleepStyles}: MapCommonProps) => {
  return (
    <Flex direction="col" className="relative h-32">
      <NextImage
        src={`/images/field/${mapId}.png`} alt={mapName}
        sizes={imageGallerySizes} className="rounded-xl opacity-50 dark:opacity-25"
      />
      <Flex direction="col" center className="z-10 h-full gap-1 p-1.5">
        <h4 className="text-xl">
          {mapName}
        </h4>
        <MapStats sleepStyles={sleepStyles}/>
      </Flex>
    </Flex>
  );
};
