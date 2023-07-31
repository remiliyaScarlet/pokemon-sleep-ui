import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
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
              <Link key={mapId} href={`/map/${mapId}`} className="button-clickable-bg group relative h-40 p-1.5">
                <Image
                  src={`/images/field/${mapId}.png`} alt={mapName}
                  fill className="rounded-xl opacity-50 dark:opacity-25"
                  sizes={imageGallerySizes}
                />
                <Flex direction="col" center className="z-10 h-full gap-1 p-1.5">
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
