import React from 'react';

import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {getSleepStyleByMaps} from '@/controller/sleepStyle';
import {imageGallerySizes} from '@/styles/image';
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
              <Link key={mapId} href={`/map/${mapId}`} className="button-clickable-bg group relative h-40">
                <NextImage
                  src={`/images/field/${mapId}.png`} alt={mapName}
                  sizes={imageGallerySizes} className="rounded-xl opacity-50 dark:opacity-25"
                />
                <Flex direction="col" center className="absolute left-0 top-0 z-10 h-full gap-1">
                  <h4 className="text-xl">
                    {mapName}
                  </h4>
                  <MapStats sleepStyles={sleepStyles}/>
                </Flex>
              </Link>
            </Flex>
          );
        })}
      </Flex>
    </PageLayout>
  );
};
